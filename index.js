"use strict";

// TrayLibV2 Modules
const
	EntityManager = require("./modules/database/entity-manager.js"),
    FirebaseAdmin = require("firebase-admin"),
	LambdaProxyAdapter = require("./modules/proxy/lambda-proxy-adapter.js"),
    Logger = require("./modules/logger.js");


class LambdaApi {
	constructor (config = {}) {

        this.Logger = Logger;

        const firebase = this._initFirebase(config);

        // Exported Modules
        this.EntityManager = firebase.EntityManager;

        this.lambdaProxyAdapter = new LambdaProxyAdapter(this);
	}

	_initFirebase (config = {}) {
		// Init Database
		if (config.firebase) {
			Logger.log("Firebase: Loading supplied configuration.");
		} else {
			config.firebase = {
				"type": process.env.FIREBASE_TYPE,
				"project_id": process.env.FIREBASE_PROJECT_ID,
				"private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
				"client_email": process.env.FIREBASE_CLIENT_EMAIL,
				"client_id": process.env.FIREBASE_CLIENT_ID,
				"auth_uri": process.env.FIREBASE_AUTH_URI,
				"token_uri": process.env.FIREBASE_TOKEN_URI,
				"auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
				"client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
				"databaseURL": process.env.FIREBASE_DATABASE_URL
			};

			try {
				// Attempt loading from Lambda
				config.firebase.private_key = JSON.parse(process.env.FIREBASE_PRIVATE_KEY || "{}");
			} catch (e){
				// Must be Circle CI
				config.firebase.private_key = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
			}

			Logger.log("Firebase: Loading config from environment.");
		}


		let Firebase = {};
		if (config.firebase.databaseURL) {
			FirebaseAdmin.initializeApp({
				credential: FirebaseAdmin.credential.cert(config.firebase),
				databaseURL: config.firebase.databaseURL
			});

			Firebase.db = FirebaseAdmin.database();
			Firebase.Auth = FirebaseAdmin.auth();
			Firebase.EntityManager = new EntityManager(Firebase.db, this.Logger);
		} else {
			this.Logger.log("Firebase not initialized for this instance.");
		}

		return Firebase;
	}

	executeLambdaProxy (event, context, callback) {
		context.callbackWaitsForEmptyEventLoop = false;
		this.lambdaProxyAdapter.execute(event, context, callback);
	}
}

module.exports = LambdaApi;
