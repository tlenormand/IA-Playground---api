import mongoose from 'mongoose';

import { MONGO_URL, MONGO_DB_NAME, USERNAME, PASSWORD, USE_SSL } from '../config/db.mjs';
import { globalInstance } from '../global/global.mjs';


/**
 * Represents a MongoDB utility class for managing database connections.
 */
class MongoDB {
    /**
     * Constructor.
     */
    constructor() {
        this.client = null;
        this.db = null;
    }

    /**
     * Connects to the MongoDB database.
     */
    async connect() {
        try {
            const options = {
                ssl: USE_SSL,
                sslValidate: false,
                useNewUrlParser: true,
            };

            if (USERNAME && PASSWORD) {
                Object.assign(options, {
                    authSource: MONGO_DB_NAME,
                    authMechanism: 'DEFAULT',
                    auth: {
                        user: encodeURIComponent(USERNAME),
                        password: encodeURIComponent(PASSWORD),
                    },
                });
            }

            mongoose.set('strictQuery', false);
            this.client = await mongoose.connect(`${MONGO_URL}/${MONGO_DB_NAME}`, options);

            this.db = this.client.connection.db;

            globalInstance.log('Connected to MongoDB', { mongoURL: MONGO_URL, db: MONGO_DB_NAME });
        }
        catch(err) {
            globalInstance.log('Unable to connect to MongoDB', { err });
        }
    }

    /**
     * Checks if the MongoDB connection is established.
     *
     * @returns {boolean} True if connected, otherwise false.
     */
    async isConnected() {
        return !!this.client && !!this.db;
    }

    /**
     * Gets the MongoDB database instance.
     *
     * @returns {object} The MongoDB database instance.
     */
    getDb() {
        return this.db;
    }

    /**
     * Gets the MongoDB client instance.
     *
     * @returns {object} The MongoDB client instance.
     */
    getClient() {
        return this.client;
    }

    /**
     * Closes the connection to the MongoDB database.
     */
    async close() {
        if (this.client) {
            try { await this.client.close(); }
            catch(err) {
                globalInstance.log('Unable to close the connection to MongoDB', { err });
            }

            globalInstance.log('Connection to MongoDB closed', { mongoURL: MONGO_URL, db: MONGO_DB_NAME });

            this.db = null;
            this.client = null;
        }
    }
}

const mongoDB = new MongoDB();
// don't use await here, because it will generate issues with jest
mongoDB.connect();

// should be imported asynchonously because jest does not support top-level await
export default mongoDB;
