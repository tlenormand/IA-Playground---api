'use strict';

import AbstractAPI from '../AbstractApi.mjs';
import AbstractCRUD from '../../crud/AbstractCRUD.mjs';
import DockerDB from '../dockers/Dockers.db.mjs';
import ModelDB from '../models/Models.db.mjs';
import ModelConfigsDB from '../models/Models.configs.db.mjs';


class AtariCRUD extends AbstractAPI {
    constructor() {
        super();
        this.AbstractCRUD = new AbstractCRUD('http://localhost:5000/env');
    }

    async create(data) { return await this.AbstractCRUD.post('atari/create', this._camelToUnderscore(data)); }
    async step(data) { return await this.AbstractCRUD.post('atari/step', this._camelToUnderscore(data)); }
    async reset(data) { return await this.AbstractCRUD.post('atari/reset', this._camelToUnderscore(data)); }
    async destroy(data) { return await this.AbstractCRUD.post('atari/destroy', this._camelToUnderscore(data)); }
    async startTrainning(data) { return await this.AbstractCRUD.post('atari/train/start', this._camelToUnderscore(data)); }

    async stopTrainning(data) {
        const query = { userId: data.userId, modelName: data.modelName };

        const modelConfig = await new ModelConfigsDB().findOne(query);
        if (!modelConfig) return new Error(404_005);

        const model = await new ModelDB().findOne({ modelConfigId: modelConfig._id });
        if (!model) return new Error(404_004);

        const dockerInstances = await new DockerDB().find({ _id: { $in: model.dockerInstanceIds } });
        if (!dockerInstances) return new Error(404_006);

        const formattedData = {
            ...data,
            dockerInstanceIds: dockerInstances.map(dockerInstance => dockerInstance.id)
        }

        return await this.AbstractCRUD.post('atari/train/stop', this._camelToUnderscore(formattedData));
    }

    _camelToUnderscore = (data) => {
        if (Array.isArray(data)) {
            return data.map(item => this._camelToUnderscore(item));
        } else if (typeof data === 'object' && data !== null) {
            const result = {};
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    result[this._underscoreKey(key)] = this._camelToUnderscore(data[key]);
                }
            }
            return result;
        } else {
            return data;
        }
    }
    
    _underscoreKey = (key) => {
        return key.replace(/([A-Z])/g, '_$1').toLowerCase();
    }
}


export default AtariCRUD;
