import mongoDB from './MongoDB.mjs';


while (!await mongoDB.isConnected()) {
    Global.log('Waiting for MongoDB to connect...');
    await new Promise(resolve => setTimeout(resolve, 1000));
}

/**
 * Checks if the MongoDB connection is established.
 *
 * @returns {boolean} True if connected, otherwise false.
 */
export async function isConnected() {
    return await mongoDB.isConnected();
}

/**
 * Represents an abstract class for interacting with a MongoDB database.
 */
export default class AbstractDB {
    /**
     * Constructor.
     *
     * @param {object} Model - The Mongoose model to be used.
     */
    constructor(Model) {
        this.collectionName = Model.collection.name;
        this.Model = Model;
        this.client = mongoDB.client;
        this.db = mongoDB.db;
        this.blackListLogsCollections = ['logs'];
    }

    //==========================================================================
    // METHODS
    //==========================================================================

    // ********** CREATE **********

    /**
     * Creates a new document in the database.
     *
     * @param {object} data - The data to be inserted.
     * @param {object} options - Options for document creation.
     *
     * @returns {Promise<object>} The created document.
     */
    async createOne(data, options) {
        this.logResult(this.collectionName, 'createOne', data);

        try {
            return await this.Model.create(data, options);
        } catch (err) {
            Global.log(err);
        }
    }

    /**
     * Creates multiple documents in the database.
     *
     * @param {Array<object>} data - The array of data to be inserted.
     * @param {object} options - Options for document creation.
     *
     * @returns {Promise<object>} The result of the creation operation.
     */
    async createMany(data, options = {}) {
        this.logResult(this.collectionName, 'createMany', data);

        let successCount = 0;
        let failureCount = 0;
        let createdItems = [];
        let failedItems = [];

        try {
            const promises = data.map(async (item) => {
                try {
                    const dataCreated = await this.Model.create(item, options);
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

            return { successCount, failureCount, createdItems, failedItems };
        } catch (error) {
            Global.logError(error);
            return { successCount, failureCount, createdItems, failedItems };
        } finally {
            Global.log({ successCount, failureCount });
        }
    }

    // ********** READ ************

    /**
     * Finds a single document in the database.
     *
     * @param {object} query - The query criteria.
     * @param {object} projections - The projection criteria.
     * @param {object} options - Options for the find operation.
     *
     * @returns {Promise<object>} The found document.
     */
    async findOne(query, projections = {}, options = {}) {
        this.logResult(this.collectionName, 'findOne', query);

        try {
            return await this.Model.findOne(query, projections, options);
        } catch (err) {
            Global.log(err);
        }
    }

    /**
     * Finds multiple documents in the database.
     *
     * @param {object} query - The query criteria.
     * @param {object} projections - The projection criteria.
     * @param {object} options - Options for the find operation.
     *
     * @returns {Promise<Array<object>>} The array of found documents.
     */
    async find(query, projections = {}, options = {}) {
        this.logResult(this.collectionName, 'find', query);

        try {
            return await this.Model.find(query, projections, options);
        }
        catch (err) {
            Global.log(err);
        }
    }

    /**
     * Performs an aggregation operation on the database.
     *
     * @param {object} query - The aggregation pipeline.
     * @param {object} [projections={}] - The projection options.
     * @param {object} [options={}] - The options for the aggregation operation.
     * @param {object} [aggregateOptions={}] - Additional options for the aggregation.
     *
     * @returns {Promise<object[]>} The result of the aggregation operation.
     */
    async aggregate(query, projections = {}, options = {}, aggregateOptions = {}) {
        this.logResult(this.collectionName, 'aggregate', query, aggregateOptions);

        try {
            return await this.Model.aggregate(query, projections, options, aggregateOptions);
        }
        catch (err) {
            Global.log(err);
        }
    }

    // ********** UPDATE **********

    /**
     * Updates a single document in the database.
     *
     * @param {object} query - The query criteria.
     * @param {object} data - The data to be updated.
     * @param {object} options - Options for the update operation.
     *
     * @returns {Promise<object>} The result of the update operation.
     */
    async updateOne(query, data, options = {}) {
        this.logResult(this.collectionName, 'updateOne', query);

        try {
            return await this.Model.updateOne(query, data, options);
        } catch (err) {
            Global.log(err);
        }
    }

    // ********** DELETE **********

    /**
     * Deletes a single document from the database.
     *
     * @param {object} query - The query criteria.
     * @param {object} options - Options for the delete operation.
     *
     * @returns {Promise<object>} The result of the delete operation.
     */
    async deleteOne(query, options = {}) {
        this.logResult(this.collectionName, 'deleteOne', query);

        try {
            return await this.Model.deleteOne(query, options);
        } catch (err) {
            Global.log(err);
        }
    }

    /**
     * Deletes multiple documents from the database.
     *
     * @param {object} query - The query criteria.
     * @param {object} options - Options for the delete operation.
     *
     * @returns {Promise<object>} The result of the delete operation.
     */
    async deleteMany(query, options = {}) {
        this.logResult(this.collectionName, 'deleteMany', query);

        try {
            return await this.db.collection(this.collectionName).deleteMany(query, options);
        } catch (err) {
            Global.log(err);
        }
    }

    // ********** OTHER **********

    // ********** UTILS **********

    /**
     * Logs the result of a database operation.
     *
     * @param {string} collection - The name of the collection.
     * @param {string} method - The database operation method.
     *
     * @param {object} query - The query criteria.
     */
    logResult(collection, method, query) {
        const normal = '\x1b[0m';
        const blueBackground = '\x1b[44m';
        if (!this.blackListLogsCollections.includes(collection)) {
            Global.log(`[${new Date().toISOString()}]${blueBackground}[DB${normal}|${collection}|${method}] =>`, query);
        }
    }
}
