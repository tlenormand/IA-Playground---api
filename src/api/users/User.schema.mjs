'use strict';

import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';


const userSchema = new mongoose.Schema({
    __id: {
        type: String,
        select: false
    },
    __v: {
        type: Number,
        select: false
    },
    // TOTO: Add updateList
    // updateList: {
    //     type: [Date],
    //     default: [],
    //     select: false
    // },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        length: 60
    },
    username: {
        type: String,
        required: [true, "Name is required"],
        minLength: [1, "Name must be at least 1 characters long"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    // TODO: Handle active users
    active: {
        type: Boolean,
        default: true
    },
    hash: {
        type: String,
        select: false
    },
    salt: {
        type: String,
        select: false
    }
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or email is incorrect',
        IncorrectUsernameError: 'Password or email is incorrect',
        MissingUsernameError: 'No email was given',
    },
    findByUsername: function(model, queryParameters) { // findByEmail
        queryParameters.active = true; // Only find active users
        return model.findOne(queryParameters);
    }
    // TODO: Add limitAttempts
    // limitAttempts: true,
    // maxAttempts: 5,
    // interval: 1000 * 60 * 60 * 24
});

const userModel = mongoose.model('User', userSchema, 'users');


export {
    userSchema,
    userModel
};
