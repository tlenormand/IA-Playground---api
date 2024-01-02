'use strict';

import { ObjectId } from 'mongodb';

import AbstractDB from '../../db/AbstractDB.mjs';
import { modelsModel, aggregatedModel } from './Models.schema.mjs';


export default class ModelsDB extends AbstractDB {
    constructor(id) {
        super(modelsModel);
        this.id = id;
    }

// ********** GET **********

    async findOne(query, projections = {}, options = {}) {
        try {
            return await super.findOne(modelsModel, query, projections, options);
        } catch (err) {
            _log(err)
        }
    }

    async find(query, projections = {}, options = {}) {
        try {
            const result = await super.aggregate(modelsModel, query, projections, options, [
                { $match: query },
                {
                    $lookup: {
                        from: 'models.configs',
                        localField: 'modelConfigId',
                        foreignField: '_id',
                        as: 'modelConfig'
                    }
                },
                {
                    $addFields: {
                        modelConfig: { $arrayElemAt: ['$modelConfig', 0] }
                    }
                },
                {
                    $lookup: {
                        from: 'models.layers',
                        localField: 'modelLayersIds',
                        foreignField: '_id',
                        as: 'modelLayers'
                    }
                }
            ]);

            // Sort layers by layer position
            if (result.length > 0 && Array.isArray(result[0].modelLayers)) {
                result.forEach(doc => {
                    doc.modelLayers.sort((a, b) => a.layerPosition - b.layerPosition);
                });
            }

            return result;
        } catch (err) {
            _log(err)
        }
    }

// ********** POST **********

    async createOne(data, options = {}) {
        try {
            return await super.createOne(modelsModel, data, options);
        } catch (err) {
            _log(err)
        }
    }

    // async createMany(data, options = {}) {
    //     try {
    //         return await super.createMany(modelsModel, data, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

// ********** PUT **********

    async updateOne(query, data, options = {}) {
        try {
            return await super.updateOne(modelsModel, query, data, options);
        } catch (err) {
            _log(err)
        }
    }

// ********** DELETE **********

    async deleteOne(query, options = {}) {
        try {
            return await super.deleteOne(modelsModel, query, options);
        } catch (err) {
            _log(err)
        }
    }
}
