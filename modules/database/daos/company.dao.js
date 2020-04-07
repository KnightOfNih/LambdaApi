"use strict";

const
	CrudDao = require("./crud.dao.js");

const ErrorCodes = require("../error-codes");

class CompanyDao extends CrudDao {
	constructor (db) {
		super(db.ref("companies"));
	}

	findAllCompanies () {
		return CrudDao.getArray(this.root);
	}

	findCompaniesByDemo (hasDemo) {
		return CrudDao.findByDemo(this.root, hasDemo);
	}

	findCompanyByAccessCode (accessCode) {
		return this.findCompanyByAttribute("accessCode", accessCode);
	}

	findCompanyByAttribute (attr, value) {
		return CrudDao.findSingleByAttribute(this.root, attr, value);
	}

	findCompanyByButton (button) {
		return this.findCompanyByKey(button.company);
	}

	async findCompanyByKey (companyKey) {
		if (!companyKey) throw Error(ErrorCodes.getNoCompanySupplied());

		let query = this.root.child(companyKey);
		return await CrudDao.getSingleObject(query);
	}

	findCompanyBySmsNumber (smsNumber) {
		return this.findCompanyByAttribute("smsNumber", smsNumber);
	}

    insertCompany(company) {
		let dbRef = this.root.push(company);
		return CrudDao._applyGetKey(company, dbRef);
    }

    async updateCompany(companyKey, value){
        if (!companyKey) throw Error(ErrorCodes.getNoCompanySupplied());
        return await this.update(this.root.child(companyKey), value);
    }


}

module.exports = CompanyDao;
