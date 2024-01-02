'use strict';

global._log = function (str, ...args) {
    console.log(str, ...args);
}
