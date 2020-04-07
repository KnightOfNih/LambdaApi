"use strict";

const ApiResource = require('./api-resource.js');

class TimeApiResource extends ApiResource {

    static async execute(context, event){
        return await ApiResource.execute(TimeApiResource, context, event);
    }

    static async get(){
        return await Promise.resolve((new Date()).getTime());
    }
}

module.exports = TimeApiResource;