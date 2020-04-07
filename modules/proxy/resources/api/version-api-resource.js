"use strict";

const ApiResource = require('./api-resource.js');

class VersionApiResource extends ApiResource {

    static async execute(context, event){
        return await ApiResource.execute(VersionApiResource, context, event);
    }

    static async get(context, event){
        let version = VersionApiResource.VERSION_DESKTOP;
        if(VersionApiResource.isMobile(event.headers)) version = VersionApiResource.VERSION_MOBILE;

        return await Promise.resolve({
            "version": version
        });
    }

    static isMobile(headers){
        return (headers || {})["CloudFront-Is-Mobile-Viewer"] === "true";
    }
}


// TODO Differentiate between android and apple

// console.log("//TODO Remove hardcode v1.1.11 version");

// VersionApiResource.VERSION_MOBILE = process.env.VERSION_MOBILE || "1.1.11";
// VersionApiResource.VERSION_ANDROID = process.env.VERSION_ANDROID || "vAndroid";
// VersionApiResource.VERSION_APPLE = process.env.VERSION_APPLE || "vApple";
// VersionApiResource.VERSION_DESKTOP = process.env.VERSION_DESKTOP || "1.1.11";

VersionApiResource.VERSION_MOBILE = 'vMobile';
VersionApiResource.VERSION_DESKTOP = 'vDesktop';


module.exports = VersionApiResource;