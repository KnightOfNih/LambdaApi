"use strict";

const assert = require("assert");

class TestUtils {
	// Catches an async function, then throws as a synchronous function so we can test with assert.throws
	static async assertThrowsAsync (fn, message) {
		let f = () => {};
		try {
			await fn();
		} catch (e) {
			f = () => {
				throw Error(e);
			};
		} finally {
			assert.throws(f, new RegExp(message));
		}
	}
}

module.exports = TestUtils;
