'use strict';

const customErrorsMessages = {
    401_000: 'Unauthorized',
    401_001: 'Unauthorized: Your account is not activated',
    404_000: 'Not found',
    404_001: 'Not found: Your account does not exist',
    404_002: 'Not found: User does not exist',
    404_003: 'Not found: Email or password incorrect',
    404_004: 'Not found: model does not exist',
    404_005: 'Not found: model config does not exist',
    404_006: 'Not found: docker does not exist',
    404_020: 'Error while deleting the distant model folder',
    409_000: 'Conflict',
    409_001: 'Conflict: Your are already logged in',
    409_002: 'Conflict: Model already exists',
    422_000: 'Unprocessable entity',
    422_001: 'Unprocessable entity: Schema validation failed',
    500_000: 'Internal server error',
    500_001: 'Internal server error: An error occurred while creating your account',
    500_002: 'Internal server error: An error occurred while logging in your account',
    500_003: 'Internal server error: An error occurred while updating your account',
    500_004: 'Internal server error: An error occurred while deleting your account',
    500_005: 'Internal server error: An error occurred while activating your account',
    500_006: 'Internal server error: An error occurred while deactivating your account',
    500_007: 'Internal server error: An error occurred while logging out your account',
}


export default customErrorsMessages;
