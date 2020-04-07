"use strict";

const ErrorCodes = require("../error-codes");

class CrudDao {
	constructor (root) {
		this.root = root;
	}

	findByCompanyKey(companyKey){
		if (!companyKey) throw Error(ErrorCodes.getNoCompanySupplied());
		return CrudDao.findArrayByAttribute(this.root, "company", companyKey);
	}

	static deleteByKey (root, key) {
		if (!key) throw Error(ErrorCodes.getNoKeySupplied());
		return root.child(key).remove();
	}

	static async findByDemo (root, hasDemo) {
		let promises = [];
		if (hasDemo === false) {
			promises.push(CrudDao.getArray(root.orderByChild("isDemo").equalTo(false)));
			promises.push(CrudDao.getArray(root.orderByChild("isDemo").equalTo(null)));
		} else {
			promises.push(CrudDao.getArray(root.orderByChild("isDemo").equalTo(true)));
		}

		let results = await Promise.all(promises);

		return [].concat(...results);
	}

	static findSingleByAttribute (root, attr, value) {
		let query = root
			.orderByChild(attr)
			.equalTo(value)
			.limitToFirst(1);

		return CrudDao.getFirst(query);
	}

	static findArrayByAttribute (root, attr, value) {
		let query = root
			.orderByChild(attr)
			.equalTo(value);

		return CrudDao.getArray(query);
	}

	static getFirst (query) {
		return query.once("value").then(dbRef => {
			let rows = CrudDao._convertToArray(dbRef);
			return rows.length ? rows[0] : null;
		});
	}

	static getSingleObject (query) {
		return query.once("value").then(dbRef => {
			return CrudDao._convertDbRefToObject(dbRef);
		});
	}

	static getArray (query) {
		return query.once("value").then(dbRef => {
			return CrudDao._convertToArray(dbRef);
		});
	}

    async update(root, record){
        // strip out functions
        let obj = {};
        for(let prop in record){
            let value = record[prop];
            if(typeof value !== "function") obj[prop] = value;
        }

        await root.update(obj);
        CrudDao._applyGetKey(obj, root);
        return obj;
    }

	static _convertDbRefToObject (dbRef) {
		let obj = dbRef.val();
        if (!obj) return null;

        this._applyGetKey(obj, dbRef);
		return obj;
	}

	static _convertToArray (dbRef) {
		let rows = [];
		dbRef.forEach(row => {
			let obj = CrudDao._convertDbRefToObject(row);
			rows.push(obj);
		});

		return rows;
	}

	static _applyGetKey(obj, dbRef){
        obj.getKey = function () {
            return dbRef.key;
        };

        return obj;
	}
}

module.exports = CrudDao;
