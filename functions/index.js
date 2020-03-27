const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Nexmo = require('nexmo');

// Initialize Firebase app for database access
admin.initializeApp();

// get Firebase environment variables for Nexmo
const {
  api_key,
  api_secret
} = functions.config().nexmo;

// Initialize Nexmo with application credentials
const nexmo = new Nexmo({
  apiKey: api_key,
  apiSecret: api_secret
});

function verifyRequest(opts) {
  return new Promise((resolve, reject) => {
    nexmo.verify.request(opts, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  });
}

function verifyCheck(opts) {
  return new Promise((resolve, reject) => {
    nexmo.verify.check(opts, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  });
}

exports.requestVerify = functions.firestore.document('/phoneNumbers/{phoneNumber}')
  .onCreate((entry, context) => {
    let opts = {
      number: context.params.phoneNumber,
      brand: "Total Home Control",
      workflow_id: 6,
      pin_expiry: 120
    };

    return verifyRequest(opts)
      .then((res) => {
        console.log(res);
        return admin.firestore().doc(`/phoneNumbers/${context.params.phoneNumber}`).update({ req_id: res.request_id })
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  });

exports.checkVerify = functions.https.onCall((data) => {
  let opts = {
    request_id: data.req_id,
    code: data.code
  };

  return verifyCheck(opts)
    .then((res) => {
      console.log(res);
      return admin.firestore().doc(`/phoneNumbers/${data.phoneNumber}`).update({ req_id: null, verified: true });
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
});

