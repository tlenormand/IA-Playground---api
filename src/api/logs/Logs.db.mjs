import AbstractDB from '../../db/AbstractDB.mjs';
import { logsModel } from './Logs.schema.mjs';


export default class LogsDB extends AbstractDB {
    constructor(id) {
        super(logsModel);
        this.id = id;
    }

// ********** CREATE **********

// ********** READ ************

// ********** UPDATE **********

// ********** DELETE **********

}
