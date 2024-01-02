'use strict';

import AbstractDB from '../../db/AbstractDB.mjs';
import { dockersModel } from './Dockers.schema.mjs';
import LogsDB from '../logs/Logs.db.mjs';


export default class DockersDB extends AbstractDB {
    constructor(id) {
        super(dockersModel);
        this.id = id;
    }

// ********** GET **********

    async findOne(query, projections = {}, options = {}) {
        try {
            return await super.findOne(dockersModel, query, projections, options);
        } catch (err) {
            _log(err)
        }
    }

    async find(query, projections = {}, options = {}) {
        try {
            return await super.find(dockersModel, query, projections, options);
        } catch (err) {
            _log(err)
        }
    }

// ********** POST **********

    async createOne(data, options = {}) {
        try {
            return await super.createOne(dockersModel, data, options);
        } catch (err) {
            _log(err)
        }
    }

    async createMany(data, options = {}) {
        try {
            return await super.createMany(dockersModel, data, options);
        } catch (err) {
            _log(err)
        }
    }

// ********** PUT **********

    async updateOne(query, data, options = {}) {
        try {
            return await super.updateOne(dockersModel, query, data, options);
        } catch (err) {
            _log(err)
        }
    }

// ********** DELETE **********

    async deleteOne(query, options = {}) {
        try {
            return await super.deleteOne(dockersModel, query, options);
        } catch (err) {
            _log(err)
        }
    }

    async deleteMany(query, options = {}) {
        try {
            const dockerInstances = await this.find(query);
            const deletedlogs = await new LogsDB().deleteMany({ docker_instance_id: { $in: dockerInstances.map(dockerInstance => dockerInstance.id) || [] } });
            if (!deletedlogs) return new Error(500_000);

            return await super.deleteMany(dockersModel, query, options);
        } catch (err) {
            _log(err)
        }
    }
}
