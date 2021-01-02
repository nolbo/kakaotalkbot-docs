var fs = require('fs');
var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://kbot-auth.firebaseio.com"
});

// firestore user data foreach
// create document

const db = admin.firestore();

const snapshot = await db.collection('users').get();

snapshot.forEach((doc) => {
    data = doc.data();
    fs.writeFile(('users/' + doc.id + '.html'), data, function (err) { err || console.log('Data replaced \n', data); });
});
