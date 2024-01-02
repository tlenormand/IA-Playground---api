'use strict';

import { ObjectId } from 'mongodb';

import AbstractAPI from '../AbstractApi.mjs';
import ErrorHandler from '../../middlewares/errors/errorHandler.middleware.mjs';
import SuccessHandler from '../../middlewares/Success/SuccessHandler.middleware.mjs';
import DockersDB from './Dockers.db.mjs';
import ModelDB from '../models/Models.db.mjs';
import ModelConfigsDB from '../models/Models.configs.db.mjs';
import ModelCRUD from '../models/Models.api.mjs';
import { dockersModel } from './Dockers.schema.mjs';


export default class DockersCRUD extends AbstractAPI {
    constructor() {
        super();
        this.db = new DockersDB();
    }

//==========================================================================
// METHODS
//==========================================================================

// ********** GET **********

    async findOne(query) {
        if (!query.name && !query.email) {
            return { error: 'No query params' };
        }

        try {
            return await this.db.findOne(query, {});
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

// ********** POST **********

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

            await new ModelCRUD().updateOne({ _id: model._id }, { $push: { dockerInstanceIds: docker._id } });

            return docker;
        } catch (error) {
            _log(error);
            return error;
        }
    }

    async createMany(data) {
        try {
            return await this.db.createMany(data);
        } catch (error) {
            _log(error);
            return error;
        }
    }

// ********** PUT **********

    async updateOne(query, data) {
        try {
            if (data.oldPassword && data.newPassword) {
                const dockers = await this.db.findOne({ _id: ObjectId(query._id) });
                if (!dockers) return new Error(404_002);
            }

            // if data remains, update dockers
            if (Object.keys(data).length > 0) {
                _log('data', data)
                await this.db.updateOne({ _id: ObjectId(query._id) }, data);
            }

            return data;
        } catch (error) {
            _log(error);
            throw error;
        }
    }

// ********** DELETE **********

    async deleteOne(query) {
        try {
            return await this.db.deleteOne({ _id: ObjectId(query.id) });
        } catch (error) {
            _log(error);
            return error;
        }
    }
}
