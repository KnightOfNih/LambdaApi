'use strict';
let config, isLocal;
try {

    config = {
        firebase: require('./config/firebase-admin.dev.json'),
    };

    console.log("Running locally.  Reading config from file.");
    isLocal = true;

} catch (e) {
    console.log("Using environment credentials.");
}

const LambdaApi = require('./index.js');
const lambdaApi = new LambdaApi(config);

exports.handler = Handler;

function Handler(event, context, callback) {
    lambdaApi.executeLambdaProxy(event, context, callback)
}

if(isLocal){
    Handler({ version: '0',
        id: 'f53eead5-103e-6eb6-0e2f-75ca9de2f816',
        'detail-type': 'Scheduled Event',
        source: 'aws.events',
        account: '370550511903',
        time: '2019-02-05T16:23:09Z',
        region: 'us-east-1',
        resources:
            [ 'arn:aws:events:us-east-1:abcdxyz:rule/my_cloudwatch_event' ],
        detail: {} }, {}, function(err){

        if(err) console.log(err);
        process.exit();
    });
}
