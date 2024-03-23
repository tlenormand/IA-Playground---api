import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

import AbstractAPI from '../api/AbstractApi.mjs';
import LogsDB from '../api/logs/Logs.db.mjs';
import ModelConfigsDB from '../api/models/Models.configs.db.mjs';
import ModelDB from '../api/models/Models.db.mjs';
import DockerDB from '../api/dockers/Dockers.db.mjs';


/**
 * Represents a controller for managing logs with CRUD operations.
 *
 * @extends AbstractAPI
 */
export default class LogsController extends AbstractAPI {
    /**
     * Constructor.
     */
    constructor() {
        super();
        this.db = new LogsDB();
    }

    //==========================================================================
    // METHODS
    //==========================================================================

    // ********** CREATE **********

    /**
     * Creates a single log.
     *
     * @param {object} data - The data of the log to create.
     *
     * @returns {Promise<object>} A promise resolving to the created log.
     */
    async createOne(data) {
        try {
            const log = await this.db.createOne(data);

            if (log.dockerInstanceId) {
                await new DockerDB().updateOne(
                    { id: log.dockerInstanceId },
                    { $push: { logsId: log._id } }
                );

                return log;
            }
        } catch (error) {
            Global.log(error);
            return error;
        }
    }

    // ********** READ ************

    /**
     * Gets logs based on the provided query.
     *
     * @param {object} query - The query to filter logs.
     *
     * @returns {Promise<object[]>} A promise resolving to an array of logs.
     */
    async get(query) {
        try {
            const modelConfig = await new ModelConfigsDB().findOne(query);
            if (!modelConfig) return new Error(404_005);

            const model = await new ModelDB().findOne({ modelConfigId: modelConfig._id });
            if (!model) return new Error(404_004);

            const dockerInstances = await new DockerDB().find({ _id: { $in: model.dockerInstanceIds } });
            if (!dockerInstances) return new Error(404_006);

            const dockerInstancesIds = dockerInstances.map(dockerInstance => dockerInstance.id);
            return await this.db.find({ docker_instance_id: { $in: dockerInstancesIds } });
        } catch (error) {
            Global.log(error);
            return error;
        }
    }

    /**
     * Finds logs based on the provided query.
     *
     * @param {object} query - The query to filter logs.
     *
     * @returns {Promise<object[]>} A promise resolving to an array of found logs.
     */
    async find(query) {
        try {
            return await this.db.find(query, {});
        } catch (error) {
            Global.log(error);
            return error;
        }
    }

    /**
     * Retrieves statistics for logs.
     *
     * @param {object} query - The query to filter logs.
     * @param {object} [params={}] - Additional parameters for generating statistics.
     *
     * @returns {Promise<object>} A promise resolving to the statistics.
     */
    async stats(query, params={}) {
        try {
            const modelConfig = await new ModelConfigsDB().findOne(query);
            if (!modelConfig) return new Error(404_005);

            const model = await new ModelDB().findOne({ modelConfigId: modelConfig._id });
            if (!model) return new Error(404_004);

            const dockerInstances = await new DockerDB().find({ _id: { $in: model.dockerInstanceIds } });
            if (!dockerInstances) return new Error(404_006);

            const dockerInstancesIds = dockerInstances.map(dockerInstance => dockerInstance.id);
            const logs = await this.db.find({ docker_instance_id: { $in: dockerInstancesIds } });
            if (!logs) return new Error(404_007);

            const logsRewardGame = this.getRewardGame(logs);
            const doneLogs = this.getDoneLogs(logs);

            const stats = {
                total: logs.length,
                executedTimeTotal: this.getExecutedTimeTotal(logs),
                totalGamePlayed: this.getTotalGamePlayed(doneLogs),
                averageRewardByGame: this.getAverageRewardByGame(doneLogs),
                averageExecutedTimeByGame: this.getAverageExecutedTimeByGame(doneLogs),
                averageFrameByGame: this.getAverageFrameByGame(doneLogs),
                chartRewardGame: this.generateChartRewardGame(logsRewardGame, params),
                chartWidth: params.width || 800,
                chartHeight: params.height || 400,
            };

            return stats;
        } catch (error) {
            Global.log(error);
            return error;
        }
    }

    // ********** UPDATE **********

    // ********** DELETE **********

    // ********** UTILS **********

    /**
     * Retrieves the reward game data from logs.
     *
     * @param {object[]} logs - The logs data.
     *
     * @returns {number[]} An array containing reward game data.
     */
    getRewardGame(logs) {
        const filteredLogs = logs.filter(log => log.done === true);
        return filteredLogs.map(item => item.reward_game);
    }

    /**
     * Generates a chart for reward game data.
     *
     * @param {number[]} data - The reward game data.
     * @param {object} [params={}] - Additional parameters for chart generation.
     *
     * @returns {Buffer} The buffer containing the chart image.
     */
    generateChartRewardGame(data, params={}) {
        const labels = data.map((item, index) => index);

        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Maximum reward by game',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };

        const chartOptions = {
            scales: {
                x: {
                    beginAtZero: true,
                    color: 'black',  // Couleur de l'axe des x
                    title: {
                        color: 'black'  // Couleur du titre de l'axe des x
                    },
                    ticks: {
                        color: 'black'  // Couleur des étiquettes de l'axe des x
                    }
                },
                y: {
                    beginAtZero: true,
                    color: 'black',  // Couleur de l'axe des y
                    title: {
                        color: 'black'  // Couleur du titre de l'axe des y
                    },
                    ticks: {
                        color: 'black'  // Couleur des étiquettes de l'axe des y
                    }
                }
            }
        };

        const chartConfig = {
            type: 'bar',
            data: chartData,
            options: chartOptions
        };

        // Créez une image du graphique et retournez-la
        const canvas = new ChartJSNodeCanvas({
            width: params.width || 800,
            height: params.height || 400,
        });
        return canvas.renderToBufferSync(chartConfig);
    }

    /**
     * Calculates the maximum executed time per instance from the logs.
     *
     * @param {object[]} logs - The logs data.
     *
     * @returns {object[]} An array containing objects with docker instance IDs and maximum executed time.
     */
    getExecutedTimeTotalPerInstance(logs) {
        const maxExecutedTimePerInstance = logs.reduce((acc, log) => {
            const { docker_instance_id, executed_time_total } = log;

            if (!acc[docker_instance_id]) { acc[docker_instance_id] = []; }

            acc[docker_instance_id].push(executed_time_total);

            return acc;
        }, {});

        const result = Object.keys(maxExecutedTimePerInstance).map((dockerInstanceId) => {
            const maxExecutedTime = Math.max(...maxExecutedTimePerInstance[dockerInstanceId]);

            return {
                docker_instance_id: dockerInstanceId,
                max_executed_time: maxExecutedTime,
            };
        });

        return result;
    }

    /**
     * Calculates the total executed time from the logs.
     *
     * @param {object[]} logs - The logs data.
     *
     * @returns {number} The total executed time.
     */
    getExecutedTimeTotal(logs) { return (this.getExecutedTimeTotalPerInstance(logs).reduce((acc, item) => acc + item.max_executed_time, 0)).toFixed(2); }

    /**
     * Filters the logs to get only the done logs.
     *
     * @param {object[]} logs - The logs data.
     *
     * @returns {object[]} An array containing only the logs marked as done.
    */
    getDoneLogs(logs) { return logs.filter(log => log.done === true); }

    /**
     * Calculates the total number of games played.
     *
     * @param {object[]} doneLogs - The done logs data.
     *
     * @returns {number} The total number of games played.
     */
    getTotalGamePlayed(doneLogs) { return doneLogs.length; }

    /**
     * Calculates the average reward per game from the done logs.
     *
     * @param {object[]} doneLogs - The done logs data.
     *
     * @returns {number} The average reward per game.
     */
    getAverageRewardByGame(doneLogs) { return (doneLogs.reduce((acc, item) => acc + item.reward_game, 0) / doneLogs.length).toFixed(2); }

    /**
     * Calculates the average executed time per game from the done logs.
     *
     * @param {object[]} doneLogs - The done logs data.
     *
     * @returns {number} The average executed time per game.
     */
    getAverageExecutedTimeByGame(doneLogs) { return (doneLogs.reduce((acc, item) => acc + item.executed_time_game, 0) / doneLogs.length).toFixed(2); }

    /**
     * Calculates the average frame count per game from the done logs.
     *
     * @param {object[]} doneLogs - The done logs data.
     *
     * @returns {number} The average frame count per game.
     */
    getAverageFrameByGame(doneLogs) { return (doneLogs.reduce((acc, item) => acc + item.frame_count_game, 0) / doneLogs.length).toFixed(0); }
}
