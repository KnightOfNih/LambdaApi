const assert = require("assert");
const UserFactory = require("../../modules/factories/user-factory");

describe("User Factory", function(){

    it("Should return a base user", async function () {
        let user = UserFactory._getBaseUser("abc", "123", "will@gmail.com");
        assert.equal(user.ignorePrompts, false);
        assert.equal(user.playNotificationSound, true);
        assert.equal(user.companyKey, "abc");
        assert.equal(user.email, "will@gmail.com");
        assert.equal(user.getKey(), "123");
        assert.equal(Object.keys(user).length, 5);
    });

    it("Should return a demo user", async function () {
        let user = UserFactory.makeDemoUser("abc", "123", "will@gmail.com");
        assert.equal(user.isAdmin, true);
        assert.equal(user.isDemo, true);
    });

});