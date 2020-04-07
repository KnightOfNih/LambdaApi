"use strict";

const ErrorCodes = require('../../../database/error-codes.js');

class ApiResource {

    static async execute(ChildApiResource, context, event){
        let result;
        switch (event.httpMethod) {
            case "GET": result = await ChildApiResource.get(context, event); break;
            case "POST": result = await ChildApiResource.post(context, event); break;
            case "PUT": result = await ChildApiResource.put(context, event); break;
            case "DELETE": result = await ChildApiResource.delete(context, event); break;

            default:
                result = await ChildApiResource.unsupportedOperation(context, event);
        }

        return result;
    }

    static async get(context, event){
        return await ApiResource.unsupportedOperation(context, event);
    }

    static async post(context, event){
        return await ApiResource.unsupportedOperation(context, event);
    }

    static async put(context, event){
        return await ApiResource.unsupportedOperation(context, event);
    }

    static async delete(context, event){
        return await ApiResource.unsupportedOperation(context, event);
    }

    static async unsupportedOperation(context, event){
        throw Error(ErrorCodes.getUnsupportedOperation(event.httpMethod))
    }
}

module.exports = ApiResource;