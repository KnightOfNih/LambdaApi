const assert = require("assert");
const sinon = require("sinon");
const TestUtils = require("../../test.utils");
const ErrorCodes = require('../../../modules/database/error-codes.js');

const
    VersionApiResource = require("../../../modules/proxy/resources/api/version-api-resource.js");

describe("Version API Resource", function () {

    let sandbox;

    beforeEach(async function () {
        sandbox = sinon.createSandbox();
    });

    afterEach(async function () {
        sandbox.restore();
    });

    it("Should throw an unsupported POST operation", async () => {
        await TestUtils.assertThrowsAsync(async () => await VersionApiResource.execute(null, {resource: "/version", httpMethod: "POST"}), ErrorCodes.getUnsupportedOperation("POST"));
    });

    it("Should throw an unsupported PUT operation", async () => {
        await TestUtils.assertThrowsAsync(async () => await VersionApiResource.execute(null, {resource: "/version", httpMethod: "PUT"}), ErrorCodes.getUnsupportedOperation("PUT"));
    });

    it("Should throw an unsupported DELETE operation", async () => {
        await TestUtils.assertThrowsAsync(async () => await VersionApiResource.execute(null, {resource: "/version", httpMethod: "DELETE"}), ErrorCodes.getUnsupportedOperation("DELETE"));
    });

    it("Should throw an unsupported WTF operation", async () => {
        await TestUtils.assertThrowsAsync(async () => await VersionApiResource.execute(null, {resource: "/version", httpMethod: "WTF"}), ErrorCodes.getUnsupportedOperation("WTF"));
    });

    it("Should return a desktop version for no mobile headers", async () => {
        const result = await VersionApiResource.execute(null, {resource: "/version", httpMethod: "GET"});
        assert.equal(result.version, "vDesktop");
    });

    it("Should return a mobile version for mobile headers", async () => {
        const result = await VersionApiResource.execute(null, {resource: "/version", httpMethod: "GET", headers: {
                "CloudFront-Is-Mobile-Viewer": "true"
            }});
        assert.equal(result.version, "vMobile");
    });
});

