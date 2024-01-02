'use strict';

import httpStatusCodes from './httpStatusCodes';
import BaseError from './baseError';


export default class Error extends BaseError {
    constructor (
        name,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'Not found.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}
