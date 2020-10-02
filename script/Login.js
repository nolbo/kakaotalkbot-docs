function login() {
    var _email;
    $('button#complete').click(function(event) {
        event.preventDefault();
        firebase.database().ref().once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val().nickname == $('#id').val().replace(/ /g, "")) {
                    _email = childSnapshot.val().email;
                }
            })
        }).then(function() {
            if (!_email) {
                $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                $('#id').val('');
                $('#pswd').val('');
            } else {
                console.log(_email)
                firebase.auth().signInWithEmailAndPassword(_email, $('#pswd').val()).then(function() {
                    location.href = 'https://kkotbot-docs.kro.kr/'; //로그인 후 이동
                }).catch(function(error) {
                    console.log(error);
                    $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #d1d1d1');
                    $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                    $('#id').val('');
                    $('#pswd').val('');
                });
            }
        });
    });
}
$(function() {login();});
