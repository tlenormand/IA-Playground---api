'use strict';

import ajv from 'ajv';
import addFormats from 'ajv-formats';

class Ajv {
    constructor(schema) {
        this.ajv = new ajv({
            allErrors: true,
        });
        this.schema = schema;

        // add formats to ajv instance (email, date...)
        addFormats(this.ajv, ['email', 'date', 'date-time', 'password']);
    }

    //==========================================================================
    // METHODS
    //==========================================================================

    validate(data) {
        const validate = this.ajv.compile(this.schema)

        if (!validate(data)) { return validate.errors; }
    }
}

export default Ajv;
