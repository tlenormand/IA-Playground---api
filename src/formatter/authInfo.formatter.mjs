'user strict';

import { passportLocalMongooseOptions as options } from '../api/users/User.schema.mjs';


/**
 * Formats authentication information for a user.
 *
 * @param {object} user - The user object for which authentication information is to be formatted.
 *
 * @returns {object} Formatted authentication information for the user.
 */
const formatAuthInfo = (user) => {
    if (!user) return;

    const attemptsInterval = Math.pow(
        options.interval,
        Math.log(user.get(options.attemptsField) + 1)
    );

    const calculatedInterval = (attemptsInterval < options.maxInterval)
        ? attemptsInterval
        : options.maxInterval;

    const timeLeftBeforeNextAttempt = (Date.now() - user.get(options.lastLoginField) < calculatedInterval)
        ? Math.floor(calculatedInterval - (Date.now() - user.get(options.lastLoginField)))
        : 0;

    const timeLeftBeforeUnlock = (options.unlockInterval && Date.now() - user.get(options.lastLoginField) > options.unlockInterval)
        ? 0
        : options.unlockInterval - (Date.now() - user.get(options.lastLoginField));

    return {
        lastLogin: user.lastLogin,
        attempts: user.attempts,
        maxAttempts: options.maxAttempts,
        timeLeftBeforeNextAttempt: timeLeftBeforeNextAttempt,
        timeLeftBeforeUnlock: timeLeftBeforeUnlock,
        timeUnlockInterval: options.unlockInterval,
        timeAttemptsInterval: options.interval,
    };
};


export default formatAuthInfo;
