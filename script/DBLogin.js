firebase.auth().signInWithEmailAndPassword('db접근 이메일', 'db접근 비번').catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('finish');
    console.log('Error Code: ' + errorCode + '\nError Message: ' + errorMessage);
    // ...
});