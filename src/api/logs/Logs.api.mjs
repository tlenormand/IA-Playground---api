'use strict';

import { ObjectId } from 'mongodb';
// import { ObjectId } from 'bson';

import AbstractAPI from '../AbstractApi.mjs';
import ErrorHandler from '../../middlewares/errors/errorHandler.middleware.mjs';
import SuccessHandler from '../../middlewares/Success/SuccessHandler.middleware.mjs';
import LogsDB from './Logs.db.mjs';
import ModelConfigsDB from '../models/Models.configs.db.mjs';
import ModelDB from '../models/Models.db.mjs';
import DockerDB from '../dockers/Dockers.db.mjs';
import { logsModel } from './Logs.schema.mjs';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';


export default class LogsCRUD extends AbstractAPI {
    constructor() {
        super();
        this.db = new LogsDB();
    }

//==========================================================================
// METHODS
//==========================================================================

// ********** GET **********

    // async findOne(query) {
    //     if (!query.name && !query.email) {
    //         return { error: 'No query params' };
    //     }

    //     try {
    //         return await this.db.findOne(query, {});
    //     } catch (error) {
    //         _log(error);
    //         return error;
    //     }
    // }

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
            _log(error);
            return error;
        }
    }

    async find(query) {
        try {
            return await this.db.find(query, {});
        } catch (error) {
            _log(error);
            return error;
        }
    }

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

            const stats = {
                total: logs.length,
                ExecutedTimeTotal: this.getExecutedTimeTotal(logs),
                chartRewardGame: this.generateChartRewardGame(logsRewardGame, params),
                chartWidth: params.width || 800,
                chartHeight: params.height || 400,
            }

            return stats;
        } catch (error) {
            _log(error);
            return error;
        }
    }

// ********** POST **********

    async createOne(data) {
        try {
            const log = await this.db.createOne(data);
            new DockerDB().updateOne(
                { id: log.dockerInstanceId },
                { $push: { logsId: log._id } }
              );

            return log;
        } catch (error) {
            _log(error);
            return error;
        }
    }

    // async createMany(data) {
    //     try {
    //         return await this.db.createMany(data);
    //     } catch (error) {
    //         _log(error);
    //         return error;
    //     }
    // }

// ********** PUT **********

    // async updateOne(query, data) {
    //     try {
    //         if (data.oldPassword && data.newPassword) {
    //             const logs = await this.db.findOne({ _id: ObjectId(query._id) });
    //             if (!logs) return new Error(404_002);
    //         }

    //         // if data remains, update logs
    //         if (Object.keys(data).length > 0) {
    //             _log('data', data)
    //             await this.db.updateOne({ _id: ObjectId(query._id) }, ...data);
    //         }

    //         return data;
    //     } catch (error) {
    //         _log(error);
    //         throw error;
    //     }
    // }

// ********** DELETE **********

    // async deleteOne(query) {
    //     try {
    //         return await this.db.deleteOne({ _id: ObjectId(query.id) });
    //     } catch (error) {
    //         _log(error);
    //         return error;
    //     }
    // }

// ********** UTILS **********

    getRewardGame(logs) {
        const filteredLogs = logs.filter(log => log.done === true);
        return filteredLogs.map(item => item.reward_game)
    }

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

    getExecutedTimeTotal(logs) {
        const executedTimeTotalPerInstance = this.getExecutedTimeTotalPerInstance(logs);

        const executedTimeTotal = executedTimeTotalPerInstance.reduce((acc, item) => {
            return acc + item.max_executed_time;
        }, 0);

        return executedTimeTotal;
    }

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
}
