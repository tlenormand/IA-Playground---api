'use strict';

import { config } from './config.mjs'


export const MONGO_URL = config.mongodb.url;
export const MONGO_DB_NAME = config.mongodb.db;
export const USE_SSL  = config.mongodb.ssl;
export const USERNAME = config.mongodb.username;
export const PASSWORD = config.mongodb.password;
