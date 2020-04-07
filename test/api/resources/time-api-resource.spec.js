const assert = require("assert");
const sinon = require("sinon");
const TestUtils = require("../../test.utils");
const ErrorCodes = require('../../../modules/database/error-codes.js');

const
    TimeApiResource = require("../../../modules/proxy/resources/api/time-api-resource.js");

describe("Time API Resource", function () {

    let sandbox;

    beforeEach(async function () {
        sandbox = sinon.createSandbox();
    });

    afterEach(async function () {
        sandbox.restore();
    });

    it("Should return a time", async () => {
        const result = await TimeApiResource.execute(null, {resource: "/time", httpMethod: "GET"});
        assert.equal(result.toString().length, 13);
    });

    it("Should throw an unsupported POST operation", async () => {
        await TestUtils.assertThrowsAsync(async () => await TimeApiResource.execute(null, {resource: "/time", httpMethod: "POST"}), ErrorCodes.getUnsupportedOperation("POST"));
    });

    it("Should throw an unsupported PUT operation", async () => {
        await TestUtils.assertThrowsAsync(async () => await TimeApiResource.execute(null, {resource: "/time", httpMethod: "PUT"}), ErrorCodes.getUnsupportedOperation("PUT"));
    });

    it("Should throw an unsupported DELETE operation", async () => {
        await TestUtils.assertThrowsAsync(async () => await TimeApiResource.execute(null, {resource: "/time", httpMethod: "DELETE"}), ErrorCodes.getUnsupportedOperation("DELETE"));
    });

    it("Should throw an unsupported WTF operation", async () => {
        await TestUtils.assertThrowsAsync(async () => await TimeApiResource.execute(null, {resource: "/time", httpMethod: "WTF"}), ErrorCodes.getUnsupportedOperation("WTF"));
    });
});

