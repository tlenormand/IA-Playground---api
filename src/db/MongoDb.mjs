'use strict';

import mongoose from 'mongoose'

import { MONGO_URL, MONGO_DB_NAME, USERNAME, PASSWORD, USE_SSL } from '../config/db.mjs'


class MongoDB {
    constructor() {
        this.client = null;
        this.db = null;
    }
  
	async connect() {
		try {
            // setup connection options
            const options = {
                ssl: USE_SSL,
                sslValidate: false,    
                useNewUrlParser: true, // remove deprecation warning
            };

            if (USERNAME && PASSWORD) {
                Object.assign(options, {
                    authSource: MONGO_DB_NAME,
                    authMechanism: 'DEFAULT',
                    auth: {
                        user:     encodeURIComponent(USERNAME),
                        password: encodeURIComponent(PASSWORD),
                    },
                });
            }

            // create connection to MongoDB using MongoClient
            // this.client = await MongoClient.connect(MONGO_URL, options);
            // create connection to MongoDB using mongoose
            this.client = await mongoose.connect(`${MONGO_URL}/${MONGO_DB_NAME}`, options);

            // select DB using MongoClient
            // this.db = this.client.db(MONGO_DB_NAME);
            // select DB using mongoose
            this.db = this.client.connection.db;

            _log('Connected to MongoDB', { mongoURL: MONGO_URL, db: MONGO_DB_NAME });
        }
        catch(err) {
            _log('Unable to connect to MongoDB', { err });
        }
    }

	async isConnected() {
		return !!this.client && !!this.db;
	}

    getDb() {
        return this.db;
    }

    getClient() {
        return this.client;
    }

    async close() {
        if (this.client) {
            try { await this.client.close() }
            catch(err) {
                _log('Unable to close the connection to MongoDB', { err });
            }

            _log('Connection to MongoDB closed', { mongoURL: MONGO_URL, db: MONGO_DB_NAME });

            this.db = null;
            this.client = null;
        }
    }
}

const mongoDB = new MongoDB();
await mongoDB.connect();

export default mongoDB;
