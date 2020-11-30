$(function () {
    function signup() {
        con = (arr, str) => {
            var a = false;
            str.split('').forEach((e) => {
                if (arr.indexOf(e) != -1) {
                    a = true;
                    return true;
                }
            });
            if (a) {
                return true;
            } else {
                return false;
            }
        }
        console.log('1');
        var Upper = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
        var Lower = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
        var Nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        var Symbols = ['~', '․', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', ']', '|', '\'', ';', ':', '‘', '“', '<', '>', ',', '.', '?', '/'];
        var id = $('#id').val().replace(/ /g, '');
        var pswd = $('#password').val().replace(/ /g, '');
        var repswd = $('#re-password').val().replace(/ /g, '');
        var email = $('#email').val().replace(/ /g, '');
        var is = false;
        var pwVal = con(Upper, pswd) && con(Lower, pswd) && con(Nums, pswd) && con(Symbols, pswd);
        var users;

        auth.firestore().collection('users').get().then(function (snapshot) {
            if (snapshot.size > 0) {
                console.log(snapshot);
                var users = [];
                snapshot.forEach(function (doc) { users.push(doc.data()); });
            } else {
                users = [];
            }
            if (users.length > 0) {
                // ID, 이메일 검사
                users.forEach((e) => {
                    if (e['id'] == id || id.length == 0) {
                        $('#email').removeAttr('style');
                        $('#email').attr('placeholder', '이메일');
                        $('#id').css('box-shadow', '0rem 0rem 0.8rem 0rem #ff0088');
                        $('#id').attr('placeholder', '사용 불가능한 아이디 입니다.');
                        $('#id').val('');
                        is = true;
                    } else if (e['email'] == email || email.length == 0 || !email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
                        $('#id').removeAttr('style');
                        $('#id').attr('placeholder', '아이디');
                        $('#email').css('box-shadow', '0rem 0rem 0.8rem 0rem #ff0088');
                        $('#email').attr('placeholder', '사용 불가능한 이메일 입니다.');
                        $('#email').val('');
                        is = true;
                    }
                });
            } else if (users.length == 0) {
                if (id.length == 0) {
                    $('#email').removeAttr('style');
                    $('#id').css('box-shadow', '0rem 0rem 0.8rem 0rem #ff0088');
                    $('#id').val('');
                    is = true;
                } else if (email.length == 0 || !email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
                    $('#id').removeAttr('style');
                    $('#email').css('box-shadow', '0rem 0rem 0.8rem 0rem #ff0088');
                    $('#email').val('');
                    is = true;
                }
            }

            if (pwVal) {
                $('#password').removeAttr('style');
            } else {
                console.log(con(Upper, pswd));
                console.log(con(Lower, pswd));
                console.log(con(Nums, pswd));
                console.log(con(Symbols, pswd));
                $('#password').css('box-shadow', '0rem 0rem 0.8rem 0rem #ff0088');
                $('#password').val('');
                is = true;
            }
            // 비밀번호 확인 검사
            if (repswd == pswd) {
                $('#re_password').removeAttr('style');
            } else {
                $('#re-password').css('box-shadow', '0rem 0rem 0.8rem 0rem #ff0088');
                $('#re-password').val('');
                is = true;
            }
            if (!is) {
                console.log('create account');
                auth.auth().createUserWithEmailAndPassword(email, pswd).then(function () {
                    auth.auth().currentUser.sendEmailVerification().then(function () {
                        auth.firestore().collection('users').doc(auth.auth().currentUser.uid).set({
                            'id': id,
                            'email': email,
                            'profile': $('img#profile').attr('src')
                        }).then(function () {
                            auth.auth().signOut().then(function () {
                                location.href = 'https://kkotbot-docs.kro.kr/login';
                            })
                        });
                    });
                }).catch(function (e) {
                    if (e.code == "auth/email-already-in-use") { $('#email').css('box-shadow', '0rem 0rem 0.8rem 0rem #ff0088'); }
                });
            }
        });
    }

    $('#complete').click(function (event) {
        event.preventDefault();
        signup();
    });
});
