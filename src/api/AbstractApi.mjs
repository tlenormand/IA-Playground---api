/**
 * AbstractAPI class provides a basic structure for API controllers.
 */
class AbstractAPI {
    #user = {};

    /**
     * Constructor.
     *
     * @param {object} [user={}] - The user data.
     */
    constructor(user = {}) {
        this.#user = user;
    }

    /**
     * Retrieves the user data stored in the instance.
     *
     * @returns {object} The user data.
     */
    _getUser() { return this.#user;	}
}


export default AbstractAPI;
