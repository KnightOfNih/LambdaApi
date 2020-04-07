"use strict";

const ErrorCodes = require("../database/error-codes.js");

const
    TimeApiResource = require("./resources/api/time-api-resource.js"),
    VersionApiResource = require("./resources/api/version-api-resource.js");

class LambdaProxyAdapter {
    constructor(config) {
        this.Logger = config.Logger;
        this.EntityManager = config.EntityManager;
    }

    async execute(event, context, callback) {
        // Analyze event and figure out which module to call
        this.Logger.debug(event);

        // Get the resource
        let err, result;

        try {
            let resource = event.resource ? event.resource : null,
                operation;


            switch (resource) {
                case "/time":           operation = LambdaProxyAdapter.TimeApiResource; break;
                case "/version":        operation = LambdaProxyAdapter.VersionApiResource; break;

                default:
                    throw Error(ErrorCodes.getResourceNotSupported());
            }

            result = await operation.execute(this, event);

        } catch (e) {
            this.Logger.error(e);
            // TODO Convert to user friendly error response
            err = e.message || e;
        }

        callback(err, result);
    }
}

LambdaProxyAdapter.TimeApiResource = TimeApiResource;
LambdaProxyAdapter.VersionApiResource = VersionApiResource;


module.exports = LambdaProxyAdapter;
