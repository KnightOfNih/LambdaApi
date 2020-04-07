"use strict";


const UserDao = require("./daos/user.dao.js");
const CompanyDao = require("./daos/company.dao.js");

class EntityManager {
	constructor (db, Logger) {
		this.db = db;
		this.Logger = Logger;

		this.UserDao = new UserDao(db);
		this.CompanyDao = new CompanyDao(db);
	}
}

module.exports = EntityManager;
