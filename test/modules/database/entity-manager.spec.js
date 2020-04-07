// Require the built in 'assertion' library
const
	assert = require("assert");

const LambdaApi = require("../../../index.js");


var firebaseConfig;
try {
	firebaseConfig = require("../../../config/firebase-admin.test.json");
} catch(e){
	// loading from environment variables
}


const FirebaseAdmin = require("firebase-admin");

describe("LambdaApi Entity Manager", function () {
	let lambdaApi,
		db;

	const data = { "company": "My company" };

	// runs before all tests in this block
	before(async function () {
		if (FirebaseAdmin.apps.length) {
			await FirebaseAdmin.app().delete();
		}

		lambdaApi = new LambdaApi({
			firebase: firebaseConfig
		});

		db = lambdaApi.EntityManager.db;
		await db.ref().set(null);
	});

	after(async function () {
		await db.ref().set(null);
	});

	it("Database should be empty", async function () {
		let snap = await db.ref().once("value");
		assert.equal(snap.val(), null);
	});

	it("Database should retain a value", async function () {
		await db.ref().set(data);
		let snap = await db.ref().once("value");
		assert.deepEqual(snap.val(), data);
	});
});
