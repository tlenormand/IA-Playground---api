'use strict';

import bcrypt from 'bcrypt';


export default class Bcrypt {
    constructor() {
        this.saltRounds = 10;
    }

//==========================================================================
// METHODS
//==========================================================================

    async hash(password) {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async compare(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}
