// Require the built in 'assertion' library
const assert = require("assert");

const LambdaApi = require("../index.js");

const FirebaseAdmin = require("firebase-admin");


describe("LambdaApi Firebase Configuration", function () {

	// runs before all tests in this block
	beforeEach(async function () {
		if (FirebaseAdmin.apps.length) {
			await FirebaseAdmin.app().delete();
		}
	});

	it("Should be empty", function () {
		let lambdaApi = new LambdaApi({
			firebase: {}
		});
		assert.deepStrictEqual(lambdaApi.EntityManager, undefined);
	});

	it("Should have TEST configuration", function () {
		let firebaseConfig;
		try {
			firebaseConfig = require("../config/firebase-admin.test.json");
		} catch(e){
			// loading from env variables
		}

		let lambdaApi = new LambdaApi({
			firebase: firebaseConfig
		});
		assert(lambdaApi.EntityManager);
	});
});

describe("LambdaApi Lambda Proxy Execution", function () {

	// runs before all tests in this block
	beforeEach(async function () {
		if (FirebaseAdmin.apps.length) {
			await FirebaseAdmin.app().delete();
		}
	});

	it("Should bind LambdaApi context", function () {
		let lambdaApi = new LambdaApi();
		assert.deepStrictEqual(lambdaApi.lambdaProxyAdapter.this, lambdaApi.this);
	});

	it("Should not wait for empty event loop", function () {
		let lambdaApi = new LambdaApi();
		let context = {};
		lambdaApi.executeLambdaProxy({}, context, function () {
			assert.equal(context.callbackWaitsForEmptyEventLoop, false);
		});
	});
});
