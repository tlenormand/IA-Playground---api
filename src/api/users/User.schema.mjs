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
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        length: 60
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [1, "Username must be at least 1 characters long"]
    },
    language: {
        type: String,
        default: "en"
    },
    role: {
        type: String,
        enum: ["god", "super", "admin", "user"],
        default: "user"
    },
    // TODO: Handle active users
    active: {
        type: Boolean,
        default: true
    },
    hash: {
        type: String,
        select: false,
    },
    salt: {
        type: String,
        select: false
    }
}, { timestamps: true });

const passportLocalMongooseOptions = {
    usernameField: 'email',
    lastLoginField: 'lastLogin',
    attemptsField: 'attempts',
    limitAttempts: true,
    maxAttempts: 10,
    interval: 100,
    maxInterval: 1000 * 5,
    unlockInterval: 1000 * 10,
    findByUsername: function(model, queryParameters) {
        queryParameters.active = true;
        return model.findOne(queryParameters);
    }
};

userSchema.plugin(passportLocalMongoose, passportLocalMongooseOptions);

const userModel = mongoose.model('User', userSchema, 'users');


export default userModel;
export {
    passportLocalMongooseOptions
};
