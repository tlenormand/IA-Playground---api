import { ENV } from '../config/env.mjs';


/**
 * Represents a utility class for global functions.
 */
class Global {
    /**
     * Logs a message.
     *
     * @param {string} str - The message string.
     * @param {...any} args - Additional arguments to be logged.
     */
    log(str, ...args) {
        if (ENV === 'test') { return; }

        console.log(str, ...args);
    }

    /**
     * Logs a message regardless of the environment.
     *
     * @param {string} str - The message string.
     * @param {...any} args - Additional arguments to be logged.
     */
    logAll(str, ...args) {
        console.log(str, ...args);
    }

    /**
     * Logs an error message.
     *
     * @param {string} str - The error message string.
     * @param {...any} args - Additional arguments related to the error.
     */
    logError(str, ...args) {
        console.error(str, ...args);
    }
}


export default Global;
