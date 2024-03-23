import AbstractDB from '../../db/AbstractDB.mjs';
import userModel from './User.schema.mjs';


export default class UserDB extends AbstractDB {
    constructor(id) {
        super(userModel);
        this.id = id;
    }

// ********** CREATE **********

    async createOne(data, options = {}) {
        this.logResult(this.collectionName, 'createOne', data);

        try {
            return await userModel.register(new userModel(data), data.password);
        } catch (error) {
            Global.logError(error);
        }
    }

    async createMany(data, options = {}) {
        this.logResult(this.collectionName, 'createMany', data);

        let successCount = 0;
        let failureCount = 0;
        let createdItems = [];
        let failedItems = [];

        try {
            const promises = data.map(async (item) => {
                try {
                    const dataCreated = await userModel.register(new userModel(item), item.password);
                    successCount++;

                    const userData = dataCreated.toObject();
                    delete userData.password;
                    delete userData.hash;
                    delete userData.salt;

                    createdItems.push(userData);
                } catch (error) {
                    failureCount++;
                    failedItems.push({ item, error });
                }
            });

            await Promise.all(promises);
        } catch (error) {
            Global.logError(error);
        } finally {
            Global.log({ successCount, failureCount });
            return { successCount, failureCount, createdItems, failedItems };
        }
    }

// ********** READ ************

// ********** UPDATE **********

// ********** DELETE **********

}
