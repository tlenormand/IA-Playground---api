import AbstractDB from '../../db/AbstractDB.mjs';
import modelsModelConfig from './Models.configs.schema.mjs';


export default class ModelsDB extends AbstractDB {
    constructor(id) {
        super(modelsModelConfig);
        this.id = id;
    }

// ********** CREATE **********

// ********** READ ************

// ********** UPDATE **********

// ********** DELETE **********

}
