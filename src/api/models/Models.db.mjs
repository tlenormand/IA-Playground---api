import { ObjectId } from 'mongodb';

import AbstractDB from '../../db/AbstractDB.mjs';
import modelsModel, { aggregatedModel } from './Models.schema.mjs';


export default class ModelsDB extends AbstractDB {
    constructor(id) {
        super(modelsModel);
        this.id = id;
    }

// ********** CREATE **********

// ********** READ ************

    async find(query, projections = {}, options = {}) {
        try {
            const result = await super.aggregate(query, projections, options, [
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
            Global.log(err)
        }
    }

// ********** UPDATE **********

// ********** DELETE **********

}
