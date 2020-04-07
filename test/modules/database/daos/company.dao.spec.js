"use strict";

const assert = require("assert");

const LambdaApi = require("../../../../index.js");

var firebaseConfig;
try {
	firebaseConfig = require("../../../../config/firebase-admin.test.json");
} catch(e){
	// loading from environment variables
}


const FirebaseAdmin = require("firebase-admin");

const TestUtils = require("../../../test.utils");

const ErrorCodes = require("../../../../modules/database/error-codes");

describe("LambdaApi Company DAO", function () {
	let lambdaApi,
		dao;

	const data = {
		"abcd": {
			"name": "Hilton",
			"accessCode": "999",
			"isDemo": true
		},
		"xyz": {
			"name": "Fairmont",
			"accessCode": "777",
			"smsNumber": 18005559999
		},
		"mno": {
			"name": "Four Seasons",
			"accessCode": "1234",
			"isDemo": true
		}
	};

	// runs before all tests in this block
	before(async function () {
		if (FirebaseAdmin.apps.length) {
			await FirebaseAdmin.app().delete();
		}

		lambdaApi = new LambdaApi({
			firebase: firebaseConfig
		});

		dao = lambdaApi.EntityManager.CompanyDao;

		await dao.root.set(data);
	});

	after(async function () {
		await dao.root.set(null);
	});

	it("Should find an object by key", async function () {
		let company = await dao.findCompanyByKey("xyz");
		assert.equal("xyz", company.getKey());
		assert.equal(company.name, "Fairmont");
	});

	it("Should find an object by access code", async function () {
		let company = await dao.findCompanyByAccessCode("999");
		assert.equal(company.name, "Hilton");
	});

	it("Should find companies by demo is true", async function () {
		let companies = await dao.findCompaniesByDemo(true);
		assert.equal(companies.length, 2);
	});

	it("Should find companies by demo is false", async function () {
		let companies = await dao.findCompaniesByDemo(false);
		assert.equal(companies.length, 1);
	});

	it("Should find company by button with valid company", async function () {
		let company = await dao.findCompanyByButton({ company: "xyz" });
		assert.equal(company.name, "Fairmont");
	});

	it("Should throw no company supplied error", async function () {
		await TestUtils.assertThrowsAsync(async () => await dao.findCompanyByButton({}), ErrorCodes.getNoCompanySupplied());
	});

	// Putting this in business logic.  Kept as a reference for comparing Errors thrown
	// Replaced with a null assertion check below
	// it("Should throw no company found error", async function () {
	// 	await TestUtils.assertThrowsAsync(async () => await dao.findCompanyByButton({ company: "666" }), ErrorCodes.getNoCompanyFound());
	// });

    it("Should return a null company", async function () {
        let company = await dao.findCompanyByButton({ company: "666" });
        assert.strictEqual(company, null);
    });

	it("Should find company by smsNumber", async function () {
		let company = await dao.findCompanyBySmsNumber(18005559999);
		assert.equal(company.name, "Fairmont");
	});

	it("Should find all companies", async function () {
		let companies = await dao.findAllCompanies();
		assert.equal(companies.length, 3);
	});

    it("Should insert a new company", async function () {
        let company = await dao.findCompanyByKey("123");
        assert.strictEqual(company, null);

        let newCompany = {
            "name": "test company"
        };

        let obj = await dao.insertCompany(newCompany);
		assert.notEqual(obj.getKey(), null);
		assert.equal(obj.name, "test company");
    });

    it("Should update company", async function(){

        let company = await dao.findCompanyByKey("abcd");
        assert.equal(company.isDemo, true);

        company.isDemo = false;

        await dao.updateCompany(company.getKey(), company);

        company = await dao.findCompanyByKey("abcd");
        assert.equal(company.isDemo, false);
    });

    it("Should throw no company supplied error for updateCompany", async function () {
        await TestUtils.assertThrowsAsync(async () => await dao.updateCompany(), ErrorCodes.getNoCompanySupplied());
    });
});
