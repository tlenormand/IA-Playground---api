'use strict';

import mongoDB from './MongoDB.mjs';


export async function isConnected() {
    return await mongoDB.isConnected();
}

export default class AbstractDB {
    constructor(Model, options = {}) {
        this.collectionName = Model.collection.name;
        this.client = mongoDB.client;
        this.db = mongoDB.db;
        this.collectionBlacklist = ["logs"];
    }

//==========================================================================
// METHODS
//==========================================================================

// ********** GET **********

    async findOne(Model, query, projections = {}, options = {}) {
        this.logResult(this.collectionName, 'findOne', query);

        try {
            const result = await Model.findOne(query, projections, options);

            return result;
        } catch (err) {
            _log(err);
        }
    }

    async find(Model, query, projections = {}, options = {}) {
        this.logResult(this.collectionName, 'find', query);

        try {
            const result = await Model.find(query, projections, options);

            return result;
        }
        catch (err) {
            _log(err);
        }
    }

    async aggregate(Model, query, projections = {}, options = {}, aggregateOptions = {}) {
        this.logResult(this.collectionName, 'aggregate', query, aggregateOptions);

        try {
            const result = await Model.aggregate(aggregateOptions);

            return result;
        }
        catch (err) {
            _log(err);
        }
    }

// ********** POST **********

    async createOne(Model, data, options) {
        this.logResult(this.collectionName, 'createOne', data);

        try {
            const result = await new Model(data).save();

            return result;
        } catch (err) {
            _log(err);
        }
    }

    async createMany(Model, data, options = {}) {
        this.logResult(this.collectionName, 'createMany', data);

        try {
            const promises = data.map(item => new Model(item).save(options));
            const results = await Promise.all(promises);

            return results;
        } catch (err) {
            _log(err);
        }
    }

// ********** PUT **********

    async updateOne(Model, query, data, options = {}) {
        this.logResult(this.collectionName, 'updateOne', query);

        try {
            return await Model.updateOne(query, data, options);
        } catch (err) {
            _log(err);
        }
    }

// ********** DELETE **********

    async deleteOne(Model, query, options = {}) {
        this.logResult(this.collectionName, 'deleteOne', query);

        try {
            const result = await this.db.collection(this.collectionName).deleteOne(query, options);

            return result;
        } catch (err) {
            _log(err);
        }
    }

    async deleteMany(Model, query, options = {}) {
        this.logResult(this.collectionName, 'deleteMany', query);

        try {
            const result = await this.db.collection(this.collectionName).deleteMany(query, options);

            return result;
        } catch (err) {
            _log(err);
        }
    }

// ********** OTHER **********

// ********** UTILS **********

    logResult(collection, method, query) {
        const normal = '\x1b[0m';
        const blueBackground = '\x1b[44m';
        _log(`${blueBackground}[DB]${normal}:[${new Date().toISOString()}]|collection:${collection}-method:${method}=>`, (this.collectionBlacklist.includes(collection)) ? 'hidden' : query);
    }
}
