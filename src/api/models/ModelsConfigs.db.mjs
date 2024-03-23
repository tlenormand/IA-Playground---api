import AbstractDB from '../../db/AbstractDB.mjs';
import modelsModel from './Models.schema.mjs';


export default class ModelsDB extends AbstractDB {
    constructor(id) {
        super(modelsModel);
        this.id = id;
    }

// ********** CREATE **********

// ********** READ **********

// ********** UPDATE **********

// ********** DELETE **********

}
