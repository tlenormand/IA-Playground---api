import Global from './console.mjs';
import CustomError from '../errors/CustomError.mjs';
import { requestWrapper } from '../middlewares/index.mjs';


const globalInstance = new Global();
global.Global = globalInstance;
global.requestWrapper = requestWrapper;
global.CustomError = CustomError;


export default Global;
export {
    globalInstance
};
