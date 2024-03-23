import { ObjectId } from 'mongodb';

import AbstractAPI from '../api/AbstractApi.mjs';
import UserDB from '../api/users/User.db.mjs';


/**
 * Represents a user entity with CRUD operations.
 *
 * @extends AbstractAPI
 */
export default class User extends AbstractAPI {
    /**
     * Constructor.
     *
     * @param {object} [user={}] - The user data.
     */
    constructor(user={}) {
        super(user);
        this.db = new UserDB();
    }

    //==========================================================================
    // METHODS
    //==========================================================================

    // ********** CREATE **********

    /**
     * Registers a new user.
     *
     * @param {object} req - The request object.
     *
     * @returns {Promise<object>} A promise resolving to the result of registration.
     */
    async register(req) {
        try {
            const newUser = await this.createOne(req.body);
            if (!newUser) { return { code: 500_001 }; }

            const result = await this.login(req, newUser);

            return { code: 201_001, data: result.data };
        } catch (err) {
            return { code: 500_000, data: err };
        }
    }

    /**
     * Creates a single user.
     *
     * @param {object} data - The data of the user to create.
     *
     * @returns {Promise<object>} A promise resolving to the created user.
     */
    async createOne(data) { return await this.db.createOne(data); }

    /**
     * Creates multiple users.
     *
     * @param {object[]} data - An array of user data.
     *
     * @returns {Promise<object>} A promise resolving to the result of creation.
     */
    async createMany(data) { return await this.db.createMany(data); }

    // ********** READ ************

    /**
     * Finds users based on the provided query.
     *
     * @param {object} query - The query to filter users.
     *
     * @returns {Promise<object[]>} A promise resolving to an array of found users.
     */
    async find(query) { return await this.db.find(query); }

    // ********** UPDATE **********

    /**
     * Updates a user.
     *
     * @param {object} query - The query to find the user to update.
     * @param {object} data - The data to update.
     *
     * @returns {Promise<object>} A promise resolving to the updated user data.
     */
    async updateOne(query, data) {
        if (data.oldPassword && data.newPassword) {
            const user = await this.db.findOne({ _id: ObjectId(query._id) });
            if (!user) return new Error(404_002);

            await new Promise((resolve, reject) => {
                user.changePassword(data.oldPassword, data.newPassword, (error, res) => {
                    if (error) { reject(error); }

                    resolve(res);
                });
            });

            data.oldPassword = '*'.repeat(data.oldPassword.length);
            data.newPassword = '*'.repeat(data.newPassword.length);
        }

        // if data remains, update user
        if (Object.keys(data).length > 0) {
            Global.log('data', data);
            await this.db.updateOne({ _id: ObjectId(query._id) }, data);
        }

        return data;
    }

    // ********** DELETE **********

    /**
     * Deletes the current user.
     *
     * @returns {Promise<object>} A promise resolving to the result of deletion.
     */
    async deleteOne() { return await this.db.deleteOne({ _id: this._getUser()._id }); }

    // ********** UTILS **********

    /**
     * Logs in a user.
     *
     * @param {object} req - The request object.
     * @param {object} user - The user object.
     *
     * @returns {Promise<object>} A promise resolving to the login result.
     */
    async login(req, user) {
        const userFound = await new Promise((resolve, reject) => {
            req.login(user, function (error) {
                if (error) { return reject({ success: false, code: 500_002, data: error }); }

                const userData = user.toObject();
                delete userData.password;
                delete userData.hash;
                delete userData.salt;

                return resolve({
                    email: userData.email,
                    username: userData.username,
                    role: userData.role,
                    language: userData.language,
                });
            });
        });

        return { success: true, code: 200_007, data: userFound };
    }

    /**
     * Logs out a user.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     *
     * @returns {Promise<object>} A promise resolving to the logout result.
     */
    async logout(req, res) {
        try {
            return new Promise((resolve, reject) => {
                req.logout((error) => {
                    if (error) { reject({ success: false, code: 500_007, data: error }); }

                    req.session.destroy();
                    res.clearCookie('connect.sid');

                    resolve({ success: true, code: 200_006, data: {} });
                });
            });
        } catch (err) {
            return { success: false, code: 500_000, data: err };
        }
    }
}
