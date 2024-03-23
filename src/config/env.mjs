export const DEV  = 'development';
export const TEST = 'test';

let env = process.env.NODE_ENV;
if ([TEST, DEV].indexOf(env) === -1) {
    console.warn(`Invalid or missing environment variable NODE_ENV: expecting "${DEV}", "${TEST}". Falling back to "${DEV}".`);
    env = DEV;
}

export const ENV = env;
export const IS_DEV  = ENV === DEV;
export const IS_DEBUG = !!process.env.DEBUG;
