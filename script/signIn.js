$(function () {
    function login() {
        var id = $('#id').val().replace(/ /g, '');
        var password = $('#password').val().replace(/ /g, '');
        auth.firestore().collection('users').get().then(function (snapshot) {
            var email = false;
            if (snapshot.size > 0) {
                console.log(snapshot);
                var users = [];
                snapshot.forEach(function (doc) {
                    users.push(doc.data());
                });
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
                $('#id').removeAttr('style');
                $('#id').attr('placeholder', '이메일');
                auth.auth().signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        if (user.user.emailVerified) {
                            location.href = location.origin;
                        } else {
                            auth.auth().signOut().then(function () {
                                alert('발송된 링크로 이메일 주소를 인증해주세요.')
                            });
                        }
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        if (errorCode == "auth/wrong-password") {
                            $('#password').css('box-shadow', '0rem 0rem 0.8rem 0rem #ff0088');
                            $('#password').attr('placeholder', '비밀번호가 일치하지 않습니다.');
                            $('#password').val('');
                        } else {
                            $('#password').removeAttr('style');
                            $('#password').attr('placeholder', '비밀번호');
                        }
                    });
            } else {
                $('#id').css('box-shadow', '0rem 0rem 0.8rem 0rem #ff0088');
                $('#id').attr('placeholder', '옳지 않은 아이디 입니다.');
                $('#id').val('');
            }
        });
    }
    $('#complete').click(function (event) {
        event.preventDefault();
        login();
    });
});
