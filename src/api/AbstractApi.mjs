'use strict';

import { ObjectID } from 'mongodb';


class AbstractAPI {
	constructor(user = {}) {
		this.user = user;
	}

	_getUser() {
		const { id, accountId } = this.user;
		return { id: new ObjectID(id), accountId };
	}

	_getLanguage(language = 'session') {
		if (language && this.user.language && language === 'session') return this.user.language;
		return language;
	}

	_getDB() {
		return this._getDBConnection();
	}
}

export default AbstractAPI;
