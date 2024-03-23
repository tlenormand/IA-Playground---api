import { ObjectId } from 'mongodb';

import AbstractAPI from '../api/AbstractApi.mjs';
import ModelsDB from '../api/models/Models.db.mjs';
import ModelsConfigsDB from '../api/models/Models.configs.db.mjs';
import ModelsLayersDB from '../api/models/Models.layers.db.mjs';
import DockersDB from '../api/dockers/Dockers.db.mjs';
import AbstractCRUD from '../crud/AbstractCRUD.mjs';
import { formatAtariModelCreatePost, formatAtariModelDeletePost, formatModelDockerRunningPost } from '../formatter/index.mjs';


/**
 * Controller for managing models.
 *
 * @extends AbstractAPI
 */
export default class ModelsController extends AbstractAPI {
    /**
     * Constructor.
     *
     * @param {string} [subRoute=''] - The sub-route for accessing different types of models.
     */
    constructor(subRoute='') {
        super();
        if (subRoute === 'configs') this.db = new ModelsConfigsDB();
        else if (subRoute === 'layers') this.db = new ModelsLayersDB();
        else this.db = new ModelsDB();
    }

    //==========================================================================
    // METHODS
    //==========================================================================

    // ********** CREATE **********

    /**
     * Creates a new model with its configuration and layers.
     *
     * @param {object} data - The data for creating the model.
     * @param {boolean} [data.force=false] - Indicates whether to force creation even if the model already exists.
     *
     * @returns {Promise<object>} A promise resolving to the created model, its configuration, and layers.
     */
    async createOne(data) {
        let modelLayersIds = [];
        let modelConfigId;
        let output = {
            model: {},
            modelConfig: {},
            modelLayers: []
        };
        const force = data.force || false;

        // check if model already exists
        const model = await new ModelsConfigsDB().findOne({ userId: data.modelConfig.userId, modelName: data.modelConfig.modelName });
        if (!force && model) {
            const error = new Error(409_002);
            error.code = 409_002;
            throw error;
        }

        await new AbstractCRUD('http://localhost:5000/env/model').post('create', formatAtariModelCreatePost(data));

        for (const layer of data.modelLayers.layers) {
            const result = await new ModelsLayersDB().createOne({ ...layer });
            modelLayersIds.push(result._id);
            output.modelLayers.push(result);
        }

        data.modelConfig.modelFullName = data.modelConfig.userId + '__' + data.modelConfig.modelName;
        const result = await new ModelsConfigsDB().createOne({ ...data.modelConfig });
        modelConfigId = result._id;
        output.modelConfig = result;

        data.model.modelLayersIds = modelLayersIds;
        data.model.modelConfigId = modelConfigId;
        output.model = await this.db.createOne({ ...data.model });

        return { ...output };
    }

    // ********** READ ************

    /**
     * Finds models based on the provided query.
     *
     * @param {object} query - The query to filter models.
     *
     * @returns {Promise<object[]>} A promise resolving to an array of found models.
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
     * Retrieves models based on the provided query.
     *
     * @param {object} query - The query to retrieve models.
     *
     * @returns {Promise<object[]>} A promise resolving to an array of retrieved models.
     */
    async get(query) {
        try {
            const modelConfigs = await new ModelsConfigsDB().find(query);
            if (!modelConfigs) return new Error(404_005);

            const modelConfigIds = modelConfigs.map(modelConfig => modelConfig._id);
            const models = await new ModelsDB().find({ modelConfigId: { $in: modelConfigIds } });
            if (!models) return new Error(404_004);

            const dockerInstances = await new DockersDB().find({ modelId: { $in: models.map(model => model._id) } });
            const dockerInstanceIds = dockerInstances.map(dockerInstance => dockerInstance.id).flat();
            const result = await new AbstractCRUD('http://localhost:5000/env/dockers').post('running', formatModelDockerRunningPost({ dockerInstanceIds: dockerInstanceIds }));
            if (!result.success) return new Error(404_006);

            // Add running docker to models
            for (const model of models) {
                model.runningDockerInstanceIds = [];
                model.isRunning = false;
                for (const runningId of result.data) {
                    const runningIdString = runningId.toString();  // Convertir en chaîne de caractères
                    const dockerInstance = dockerInstances.find(dockerInstance => dockerInstance.id === runningIdString);
                    if (dockerInstance) {
                        const dockerInstance_id = dockerInstance._id;
                        if (model.dockerInstanceIds.some(id => id.toString() === dockerInstance_id.toString())) {
                            model.runningDockerInstanceIds.push(dockerInstance_id);
                            model.isRunning = true;
                        }
                    }
                }
            }

            return models;
        }
        catch (error) {
            Global.log(error);
            return error;
        }
    }

    // ********** UPDATE **********

    /**
     * Updates a single document in the database.
     *
     * @param {object} query - The query parameters.
     * @param {object} data - The data to update.
     *
     * @returns {Promise<object>} A promise resolving to the updated data.
     */
    async updateOne(query, data) {
        try {
            const models = await this.db.findOne({ _id: ObjectId(query._id) });
            if (!models) return new Error(404_004);

            // if data remains, update models
            if (Object.keys(data).length > 0) {
                Global.log('data', data);
                await this.db.updateOne({ _id: ObjectId(query._id) }, data);
            }

            return data;
        } catch (error) {
            Global.log(error);
            throw error;
        }
    }

    // ********** DELETE **********

    /**
     * Deletes a single document from the database.
     *
     * @param {object} body - The request body.
     * @param {object} query - The query parameters.
     *
     * @returns {Promise<object>} A promise resolving to the response data.
     */
    async deleteOne(body, query) {
        try {
            const response = await new AbstractCRUD('http://localhost:5000/env/model').post('delete', formatAtariModelDeletePost(body, query));
            if (!response.success) return new Error(404_020);

            const modelConfig = await new ModelsConfigsDB().findOne(query);
            if (!modelConfig) return new Error(404_004);

            const deletedDockerInstances = await new DockersDB().deleteMany({ _id: { $in: modelConfig.dockerInstanceIds || [] } });
            if (!deletedDockerInstances) return new Error(500_000);

            const deletedModelLayers = await new ModelsLayersDB().deleteMany({ _id: { $in: modelConfig.modelLayersIds || [] } });
            if (!deletedModelLayers) return new Error(500_000);

            const deletedModelConfig = await new ModelsConfigsDB().deleteOne({ _id: modelConfig._id });
            if (!deletedModelConfig) return new Error(500_000);

            const deletedModel = await this.db.deleteOne({ modelConfigId: modelConfig._id });
            if (!deletedModel) return new Error(500_000);

            return await this.db.deleteOne(query);
        } catch (error) {
            Global.log(error);
            return error;
        }
    }
}
