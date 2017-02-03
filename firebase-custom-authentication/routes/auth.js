'use strict'

var express = require('express');
var admin = require("firebase-admin");
var router = express.Router();

const X_FIREBASE_TOKEN = 'X-FIREBASE-TOKEN';
// TODO
const SECONDARY_FIREBASE_APP_NAME = "<Your app name>";

// TODO
const primaryServiceAccount = require('../certs/primary/<Your primary service account name>.json');
const secondaryServiceAccount = require('../certs/secondary/<Your secondary service account name>.json');

// Set Firebase options.
const primaryFirebaseOptions = { credential: admin.credential.cert(primaryServiceAccount) }
const secondaryFirebaseOptions = { credential: admin.credential.cert(secondaryServiceAccount) }

// Initialize both Firebase Apps.
admin.initializeApp(primaryFirebaseOptions);
const secondaryApp = admin.initializeApp(secondaryFirebaseOptions, SECONDARY_FIREBASE_APP_NAME);

// ex: http://localhost:3000/auth
router.post('/', function (req, res, next) {
  let token;
  if (req.get(X_FIREBASE_TOKEN)) {
    // Get the token.
    token = req.get(X_FIREBASE_TOKEN);
  }

  // First, verify the ID token using the primary app.
  admin.auth().verifyIdToken(token).then(function (decodedToken) {
    let uid = decodedToken.uid;
    console.log('UID:' + uid);

    // Second, create a custom token using the secondary app.
    admin.auth(secondaryApp).createCustomToken(uid).then(function (customToken) {
      console.log('Custom token:' + customToken);
      // Send the token back to the client.
      res.send(customToken);
    })
  }, function (error) {
    console.log(error);
    res.send("Invalid token.");
  });
})

module.exports = router;