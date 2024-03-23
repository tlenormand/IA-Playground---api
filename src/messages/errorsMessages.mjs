const customErrorsMessages = {
    401_000: 'Unauthorized',
    401_001: 'Unauthorized: Your account is not activated',
    401_002: 'Unauthorized: You need to be logged in',
    403_000: 'Forbidden',
    403_001: 'Forbidden: You do not have the right role',
    404_000: 'Not found',
    404_001: 'Not found: Your account does not exist',
    404_002: 'Not found: User does not exist',
    404_003: 'Not found: Email or password incorrect',
    404_004: 'Not found: Model does not exist',
    404_005: 'Not found: Model config does not exist',
    404_006: 'Not found: Docker does not exist',
    404_007: 'Not found: Logs does not exist',
    404_008: 'Not found: Validator is missing in the config file',
    404_009: 'Not found: Authorization is missing in the config file',
    404_010: 'Not found: Authentication is missing in the config file',
    404_011: 'Not found: Roles are missing in the config file',
    404_012: 'Not found: Password incorrect',
    404_013: 'Not found: Missing URL path for the request configuration',
    404_014: 'Not found: Missing URL method for the request configuration',
    404_015: 'Not found: Missing path for the request configuration',
    404_016: 'Not found: Missing method for the request configuration',
    404_020: 'Error while deleting the distant model folder',
    409_000: 'Conflict',
    409_001: 'Conflict: Your are already logged in',
    409_002: 'Conflict: Model already exists',
    409_003: 'Conflict: User already exists',
    422_000: 'Unprocessable entity',
    422_001: 'Unprocessable entity: Schema validation failed',
    422_002: 'Unprocessable entity: Body should not contain user credentials object',
    422_003: 'Email already exists',
    429_000: 'Too many requests',
    429_001: 'Too many requests: Attempt too soon, please wait a few seconds',
    429_002: 'Too many requests: Too many attempts, please try again later',
    500_000: 'Internal server error',
    500_001: 'Internal server error: An error occurred while creating your account',
    500_002: 'Internal server error: An error occurred while logging in your account',
    500_003: 'Internal server error: An error occurred while updating your account',
    500_004: 'Internal server error: An error occurred while deleting your account',
    500_005: 'Internal server error: An error occurred while activating your account',
    500_006: 'Internal server error: An error occurred while deactivating your account',
    500_007: 'Internal server error: An error occurred while logging out your account',
    500_999: 'Internal server error: Unhandled error occurred while processing your request',
};


export default customErrorsMessages;
