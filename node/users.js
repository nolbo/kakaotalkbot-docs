var fs = require('fs');
var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://kbot-auth.firebaseio.com"
});

// firestore user data foreach
// create document
/*
const db = admin.firestore();

const users = db.collection('users');

const snapshot = await users.get();

snapshot.forEach((doc) => {
    data = doc.data();
    fs.writeFile(('users/' + doc.id + '.html'), data, function (err) { err || console.log('Data replaced \n', data); });
});
*/