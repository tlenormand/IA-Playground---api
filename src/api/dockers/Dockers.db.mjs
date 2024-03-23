import AbstractDB from '../../db/AbstractDB.mjs';
import dockersModel from './Dockers.schema.mjs';
import LogsDB from '../logs/Logs.db.mjs';


export default class DockersDB extends AbstractDB {
    constructor(id) {
        super(dockersModel);
        this.id = id;
    }

// ********** CREATE **********

// ********** READ ************

// ********** UPDATE **********

// ********** DELETE **********

    async deleteMany(query, options = {}) {
        try {
            const dockerInstances = await this.find(query);
            const deletedlogs = await new LogsDB().deleteMany({ docker_instance_id: { $in: dockerInstances.map(dockerInstance => dockerInstance.id) || [] } });
            if (!deletedlogs) return new Error(500_000);

            return await super.deleteMany(query, options);
        } catch (err) {
            Global.log(err)
        }
    }
}
