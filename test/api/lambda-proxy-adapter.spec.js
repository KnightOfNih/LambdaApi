// Require the built in 'assertion' library
const
    assert = require("assert"),
    ErrorCodes = require("../../modules/database/error-codes"),
    LambdaApi = require("../../index.js"),
    sinon = require("sinon"),
    FirebaseAdmin = require("firebase-admin");


const
    LambdaProxyAdapter = require("../../modules/proxy/lambda-proxy-adapter");

describe("LambdaApi Lambda Proxy Execution", function () {

    let sandbox;

    // runs before all tests in this block
    beforeEach(async function () {
        sandbox = sinon.createSandbox();
        if (FirebaseAdmin.apps.length) {
            await FirebaseAdmin.app().delete();
        }
    });

    afterEach(async function () {
        sandbox.restore();
    });

    it("Should execute a lambda time proxy", function () {
        LambdaProxyAdapter.TimeApiResource = { execute: sandbox.spy()};
        let lambdaApi = new LambdaApi();

        lambdaApi.executeLambdaProxy({resource: "/time"}, {}, function (err, data) {
            assert(LambdaProxyAdapter.TimeApiResource.execute.calledOnce);
        });
    });

    it("Should execute a lambda version proxy", function () {
        LambdaProxyAdapter.VersionApiResource = { execute: sandbox.spy()};
        let lambdaApi = new LambdaApi();

        lambdaApi.executeLambdaProxy({resource: "/version"}, {}, function(err, result){
            assert(LambdaProxyAdapter.VersionApiResource.execute.calledOnce);
        });
    });

    it("Should throw an unsupported error operation.", function(){
        let lambdaApi = new LambdaApi();
        lambdaApi.executeLambdaProxy({}, {}, function (err) {
            assert.equal(err, ErrorCodes.getResourceNotSupported());
        });
    });
});
