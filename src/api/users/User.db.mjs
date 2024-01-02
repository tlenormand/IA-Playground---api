'use strict';

import AbstractDB from '../../db/AbstractDB.mjs';
import { userModel } from './User.schema.mjs';


export default class UserDB extends AbstractDB {
    constructor(id) {
        super(userModel);
        this.id = id;
    }

// ********** GET **********

    async findOne(query, projections = {}, options = {}) {
        try {
            return await super.findOne(userModel, query, projections, options);
        } catch (err) {
            _log(err)
        }
    }

    async find(query, projections = {}, options = {}) {
        try {
            return await super.find(userModel, query, projections, options);
        } catch (err) {
            _log(err)
        }
    }

// ********** POST **********

    async createOne(data, options = {}) {
        try {
            return await super.createOne(userModel, data, options);
        } catch (err) {
            _log(err)
        }
    }

    async createMany(data, options = {}) {
        try {
            return await super.createMany(userModel, data, options);
        } catch (err) {
            _log(err)
        }
    }

// ********** PUT **********

    async updateOne(query, data, options = {}) {
        try {
            return await super.updateOne(userModel, query, data, options);
        } catch (err) {
            _log(err)
        }
    }

// ********** DELETE **********

    async deleteOne(query, options = {}) {
        try {
            return await super.deleteOne(userModel, query, options);
        } catch (err) {
            _log(err)
        }
    }
}
