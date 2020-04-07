
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Run ngrok to capture webhooks
// ../ngrok http -host-header=rewrite localhost:1337


"use strict";

const config = {
    firebase: require("../config/firebase-admin.test.json"),
    auth: require("../config/firebase-admin.test.json"),
};

const lambdaApi = new (require("../index"))(config);


// *** Put Lambda Functions Here *** //


app.get("/time", ApiRequest);

app.get("/version", ApiRequest);

// *** End Lambda Functions *** //


http.createServer(app).listen(1337, function() {
    console.log("Express server listening on port 1337"); // eslint-disable-line
});


function ApiRequest(request, response){

    const requestUrl = request.originalUrl.split('?')[0].split('/')[1];

    lambdaApi.executeLambdaProxy({
            headers: request.headers,
            resource: '/' + requestUrl,
            httpMethod: request.method,
            body: request.body,
            params: request.params,
            query: request.query
        },
        {},
        handleResponse.bind(response))
}

function handleResponse(err, response) {

    const status = response && response.statusCode ? response.statusCode : 200;
    let data = response && response.body ? response.body : {errorMessage: err};

    if (typeof data === 'string') data = JSON.parse(data);

    this
        .header("Content-Type","application/json")
        .header("Access-Control-Allow-Origin", "*")
        .status(status)
        .send(data);


    // AWS Example
    // Note that AWS doesn't send back a "body" property, but instead a "data" property.
    // callback(err, {
    //     statusCode: ,
    //     body: err ? JSON.stringify({err:err.message}) : JSON.stringify(data),
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*"
    //     },
    //     isBase64Encoded: false
    // });
}

