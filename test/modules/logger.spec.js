const assert = require("assert");

const Logger = require("../../modules/logger.js");

const sinon = require("sinon");

const sinonTest = require("sinon-test");

const test = sinonTest(sinon);

describe("Logger logging", function () {
	beforeEach(function () {
		Logger.PRINT_FN = sinon.stub();
	});

	it("Should not log anything", test(function () {
		Logger.LOG_LEVEL = Logger.NO_LOGGING;
		assert.equal(Logger.error("yo"), false);
		assert.equal(Logger.log("yo"), false);
		assert.equal(Logger.debug("yo"), false);
		assert.equal(Logger.trace("yo"), false);
	}));

	it("Should log only errors", test(function () {
		Logger.LOG_LEVEL = Logger.ERROR_LEVEL;
		assert.equal(Logger.error("yo"), true);
		assert.equal(Logger.log("yo"), false);
		assert.equal(Logger.debug("yo"), false);
		assert.equal(Logger.trace("yo"), false);
	}));

	it("Should log errors and default", test(function () {
		Logger.LOG_LEVEL = Logger.DEFAULT_LEVEL;
		assert.equal(Logger.error("yo"), true);
		assert.equal(Logger.log("yo"), true);
		assert.equal(Logger.debug("yo"), false);
		assert.equal(Logger.trace("yo"), false);
	}));

	it("Should log errors, default, and debug", test(function () {
		Logger.LOG_LEVEL = Logger.DEBUG_LEVEL;
		assert.equal(Logger.error("yo"), true);
		assert.equal(Logger.log("yo"), true);
		assert.equal(Logger.debug("yo"), true);
		assert.equal(Logger.trace("yo"), false);
	}));

	it("Should log errors, default, debug, and trace", test(function () {
		Logger.LOG_LEVEL = Logger.TRACE_LEVEL;
		assert.equal(Logger.error("yo"), true);
		assert.equal(Logger.log("yo"), true);
		assert.equal(Logger.debug("yo"), true);
		assert.equal(Logger.trace("yo"), true);
	}));
});
