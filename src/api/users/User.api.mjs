'use strict';

import { ObjectId } from 'mongodb';

import AbstractAPI from '../AbstractApi.mjs';
import ErrorHandler from '../../middlewares/errors/errorHandler.middleware.mjs';
import SuccessHandler from '../../middlewares/Success/SuccessHandler.middleware.mjs';
import UserDB from './User.db.mjs';
import { userModel } from './User.schema.mjs';


export default class User extends AbstractAPI {
    constructor() {
        super();
        this.db = new UserDB();
    }

//==========================================================================
// METHODS
//==========================================================================

// ********** GET **********

    async findOne(query) {
        if (!query.name && !query.email) {
            return { error: 'No query params' };
        }

        try {
            return await this.db.findOne(query, { password: 0, __v: 0, _id: 0, hash: 0, salt: 0 });
        } catch (error) {
            _log(error);
            return error;
        }
    }

    async find(query) {
        try {
            return await this.db.find(query, { password: 0, __v: 0, _id: 0, hash: 0, salt: 0 });
        } catch (error) {
            _log(error);
            return error;
        }
    }

// ********** POST **********

    async createOne(data) {
        try {
            return await this.db.createOne(data);
        } catch (error) {
            _log(error);
            return error;
        }
    }

    async createMany(data) {
        try {
            return await this.db.createMany(data);
        } catch (error) {
            _log(error);
            return error;
        }
    }

// ********** PUT **********

    async updateOne(query, data) {
        try {
            if (data.oldPassword && data.newPassword) {
                const user = await this.db.findOne({ _id: ObjectId(query._id) });
                if (!user) return new Error(404_002);

                const changePasswordPromise = (user, oldPassword, newPassword) => {
                    return new Promise((resolve, reject) => {
                        user.changePassword(oldPassword, newPassword, (error, res) => {
                            if (error) { reject(error); }

                            resolve(res);
                        });
                    });
                };

                await changePasswordPromise(user, data.oldPassword, data.newPassword);
                data.oldPassword = '*'.repeat(data.oldPassword.length);
                data.newPassword = '*'.repeat(data.newPassword.length);
            }

            // if data remains, update user
            if (Object.keys(data).length > 0) {
                _log('data', data)
                await this.db.updateOne({ _id: ObjectId(query._id) }, data);
            }

            return data;
        } catch (error) {
            _log(error);
            throw error;
        }
    }

// ********** DELETE **********

    async deleteOne(query) {
        try {
            return await this.db.deleteOne({ _id: ObjectId(query.id) });
        } catch (error) {
            _log(error);
            return error;
        }
    }
}
