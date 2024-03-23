import ajv from 'ajv';
import addFormats from 'ajv-formats';


/**
 * Represents a validator using the Ajv library.
 *
 * @param {object} validatorSchema - The schema used for validation.
 */
class Ajv {
    /**
     * Constructor.
     *
     * @param {object} validatorSchema - The schema used for validation.
     */
    constructor(validatorSchema) {
        this.ajv = new ajv({
            allErrors: true,
        });
        this.validatorSchema = validatorSchema;

        // add formats to ajv instance (email, date...)
        addFormats(this.ajv, ['email', 'date', 'date-time', 'password']);
    }

    //==========================================================================
    // METHODS
    //==========================================================================

    /**
     * Validates the given data against the validator schema.
     *
     * @param {object} data - The data to validate.
     *
     * @returns {object | undefined} An object containing validation errors if any, or undefined if validation succeeds.
     */
    validate(data) {
        const validate = this.ajv.compile(this.validatorSchema);

        if (!validate(data)) { return validate.errors; }
    }
}

export default Ajv;
