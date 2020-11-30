auth.firestore().collection('users').get().then(function (snapshot) {
    var email = false;
    if (snapshot.size > 0) {
        console.log(snapshot);
        var users = [];
        snapshot.forEach(function (doc) { users.push(doc.data()); });
    } else {
        users = [];
    }
    if (users.length > 0) {
        users.forEach((e) => {
            if (e['id'] == id) {
                email = e['email'];
            }
        });
    }
    if (email) {
        //
    } else {
        //
    }
});