import AbstractDB from '../../db/AbstractDB.mjs';
import modelsModelLayer from './Models.layers.schema.mjs';


export default class ModelsDB extends AbstractDB {
    constructor(id) {
        super(modelsModelLayer);
        this.id = id;
    }

// ********** CREATE **********

// ********** READ ************

// ********** UPDATE **********

// ********** DELETE **********

}
