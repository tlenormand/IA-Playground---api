import { ObjectId } from 'mongodb';

import AbstractAPI from '../api/AbstractApi.mjs';
import DockersDB from '../api/dockers/Dockers.db.mjs';
import ModelDB from '../api/models/Models.db.mjs';
import ModelConfigsDB from '../api/models/Models.configs.db.mjs';
import ModelController from '../controller/Models.controller.mjs';


/**
 * DockersController handles CRUD operations for docker instances.
 *
 * @extends AbstractAPI
 */
export default class DockersController extends AbstractAPI {
    /**
     * Constructor.
     */
    constructor() {
        super();
        this.db = new DockersDB();
    }

    //==========================================================================
    // METHODS
    //==========================================================================

    // ********** CREATE **********

    /**
     * Creates a new docker instance.
     *
     * @param {object} data - The data for creating the docker instance.
     *
     * @returns {object} The created docker instance.
     */
    async createOne(data) {
        try {
            const modelConfig = await new ModelConfigsDB().findOne({ modelFullName: `${data.userId}__${data.modelName}` });
            if (!modelConfig) return new Error(404_005);

            const model = await new ModelDB().findOne({ modelConfigId: modelConfig._id });
            if (!model) return new Error(404_004);

            const docker = await this.db.createOne({
                id: data.id,
                modelId: model._id,
                modelConfigId: modelConfig._id,
                userId: data.userId,
                modelName: data.modelName,
            });

            await new ModelController().updateOne({ _id: model._id }, { $push: { dockerInstanceIds: docker._id } });

            return docker;
        } catch (error) {
            Global.log(error);
            return error;
        }
    }

    /**
     * Creates multiple docker instances.
     *
     * @param {object[]} data - The data for creating multiple docker instances.
     *
     * @returns {object[]} An array of created docker instances.
     */
    async createMany(data) {
        try {
            return await this.db.createMany(data);
        } catch (error) {
            Global.log(error);
            return error;
        }
    }

    // ********** READ ************

    /**
     * Finds one docker instance based on the query.
     *
     * @param {object} query - The query to find the docker instance.
     *
     * @returns {object} The found docker instance.
     */
    async findOne(query) {
        if (!query.name && !query.email) {
            return { error: 'No query params' };
        }

        try {
            return await this.db.findOne(query, {});
        } catch (error) {
            Global.log(error);
            return error;
        }
    }

    /**
     * Finds docker instances based on the query.
     *
     * @param {object} query - The query to find docker instances.
     *
     * @returns {object[]} An array of found docker instances.
     */
    async find(query) {
        try {
            return await this.db.find(query, {});
        } catch (error) {
            Global.log(error);
            return error;
        }
    }

    // ********** UPDATE **********

    /**
     * Updates one docker instance based on the query and data.
     *
     * @param {object} query - The query to find the docker instance to update.
     * @param {object} data - The data to update the docker instance.
     *
     * @returns {object} The updated docker instance.
     */
    async updateOne(query, data) {
        try {
            if (data.oldPassword && data.newPassword) {
                const dockers = await this.db.findOne({ _id: ObjectId(query._id) });
                if (!dockers) return new Error(404_002);
            }

            // if data remains, update dockers
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
     * Deletes one docker instance based on the query.
     *
     * @param {object} query - The query to find the docker instance to delete.
     *
     * @returns {object} The result of the deletion operation.
     */
    async deleteOne(query) {
        try {
            return await this.db.deleteOne({ _id: ObjectId(query.id) });
        } catch (error) {
            Global.log(error);
            return error;
        }
    }
}
