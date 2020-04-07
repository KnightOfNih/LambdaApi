"use strict";

const
	CrudDao = require("./crud.dao.js");

const ErrorCodes = require("../error-codes");

class UserDao extends CrudDao {
	constructor (db) {
		super(db.ref("users"));
	}

	deleteUserByKey (userKey) {
		return CrudDao.deleteByKey(this.root, userKey);
	}

	findAllUsers () {
		return CrudDao.getArray(this.root);
	}

    async findUserByEmail (email) {
        if (!email) throw Error(ErrorCodes.getNoUserKeySupplied());
        return await CrudDao.findSingleByAttribute(this.root, "email", email);
    }

	async findUserByKey (userKey) {
		if (!userKey) throw Error(ErrorCodes.getNoUserKeySupplied());

		let query = this.root.child(userKey);
		return await CrudDao.getSingleObject(query);
	}

	async findUsersByCompanyKey(companyKey){
		if (!companyKey) throw Error(ErrorCodes.getNoCompanySupplied());
		return await CrudDao.findArrayByAttribute(this.root, "company", companyKey);
	}

	findUsersByDemo (hasDemo) {
		return CrudDao.findByDemo(this.root, hasDemo);
	}

    async updateUser(userKey, value) {
        if (!userKey) throw Error(ErrorCodes.getNoUserKeySupplied());
        return await this.update(this.root.child(userKey), value);
    }
}

module.exports = UserDao;
