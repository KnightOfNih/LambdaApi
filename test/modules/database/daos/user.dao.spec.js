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

describe("LambdaApi User DAO", function () {
	let lambdaApi,
		dao;

	const data = {
		oJ31fFrf5BW5JbDx4gAYLlVB4jf1: {
			company: "-LQ9PBs3-ErQKmwKgeCZ",
			email: "will@gmail.com"
		},
		oKIxYjCRuRcLZ9x1ms3MUypk6Zg1: {
			company: "-LQ9PBs3-ErQKmwKgeCZ",
			email: "josh@gmail.com"
		},
		oQw2AewpNEgmDtv3urgJkTUTHAV2: {
			company: "-LQ9PBs3-ErQKmwKgeCZ",
			email: "natalie@gmail.com"
		},
		oZXW68aOWdTBsIDZ1WMLITbRKhc2: {
			company: "-LGLTbmSn_ty5LEGxZYh",
			email: "michael@gmail.com",
			isDemo: true
		},
		oamlApiy1xUbtldlGlOoKHhVGi73: {
			company: "-LGLTbmSn_ty5LEGxZYh",
			email: "sally@gmail.com",
			isDemo: true
		},
		ofO9zSZZYVbEtk7otUJpGvPLH0T2: {
			company: "-LMc5SiQiiN9Qsisvs-Z",
			email: "zach@yahoo.com",
			isDemo: false
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

		dao = lambdaApi.EntityManager.UserDao;

		await dao.root.set(data);
	});

	after(async function () {
		await dao.root.set(null);
	});

	it("Should find all users", async function () {
		let users = await dao.findAllUsers();
		assert(users.length, 6);
	});

	it("Should find all users by company key", async function () {
		let users = await dao.findByCompanyKey("-LQ9PBs3-ErQKmwKgeCZ");
		assert(users.length, 3);
	});

	it("Should throw no company key supplied error ", async function () {
		await TestUtils.assertThrowsAsync(async () => await dao.findByCompanyKey(), ErrorCodes.getNoCompanySupplied());
	});

	it("Should find user by key", async function () {
		let user = await dao.findUserByKey("oamlApiy1xUbtldlGlOoKHhVGi73");
		assert(user.email, "sally@gmail.com");
	});

	it("Should throw no user key supplied error ", async function () {
		await TestUtils.assertThrowsAsync(async () => await dao.findUserByKey(), ErrorCodes.getNoUserKeySupplied());
	});

    it("Should return a null user when not found ", async function () {
		let user = await dao.findUserByKey("xxx");
		assert.strictEqual(user, null);
    });

	it("Should find users by demo", async function () {
		let users = await dao.findUsersByDemo();
		assert.equal(users.length, 2);
	});

	it("Should find users by demo with true", async function () {
		let users = await dao.findUsersByDemo(true);
		assert.equal(users.length, 2);
	});

	it("Should find users by demo with false", async function () {
		let users = await dao.findUsersByDemo(false);
		assert.equal(users.length, 4);
	});

	it("Should throw no user key supplied error ", async function () {
		await TestUtils.assertThrowsAsync(async () => await dao.deleteUserByKey(), ErrorCodes.getNoKeySupplied());
	});

	// Note any additional tests should reload the data since
	it("Should delete user by key", async function () {
		let users = await dao.findByCompanyKey("-LQ9PBs3-ErQKmwKgeCZ");
		assert(users.length, 3);
		await dao.deleteUserByKey("oKIxYjCRuRcLZ9x1ms3MUypk6Zg1");
		users = await dao.findByCompanyKey("-LQ9PBs3-ErQKmwKgeCZ");
		assert(users.length, 2);
	});

    it("Should throw no user key supplied error", async function () {
        await TestUtils.assertThrowsAsync(async () => await dao.findUserByEmail(), ErrorCodes.getNoUserKeySupplied());
    });

    it("Should find user by email", async function () {
        let user = await dao.findUserByEmail("michael@gmail.com");
        assert.equal(user.getKey(), "oZXW68aOWdTBsIDZ1WMLITbRKhc2");
    });

    it("Should update user", async function(){

        let user = await dao.findUserByEmail("michael@gmail.com");
        assert.equal(user.isDemo, true);

        user.isDemo = false;

        await dao.updateUser(user.getKey(), user);

        user = await dao.findUserByEmail("michael@gmail.com");
        assert.equal(user.isDemo, false);
    });

    it("Should throw no user key supplied error for updateUser", async function () {
        await TestUtils.assertThrowsAsync(async () => await dao.updateUser(), ErrorCodes.getNoUserKeySupplied());
    });

});
