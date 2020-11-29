function GenerateHMAC(key, payload) {
    var message = btoa(payload);
    var hash = CryptoJS.HmacSHA256(message, key);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash).replace(/\//g, "|");
    return hashInBase64;
}

$(function () {
    function signup() {
        var Upper = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
        var Lower = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
        var Nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        var Symbols = ['~', '․', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', ']', '|', '\'', ';', ':', '‘', '“', '<', '>', ',', '.', '?', '/'];
        var id = $('#id').val().replace(/ /g, '');
        var pswd = $('#pswd').val().replace(/ /g, '');
        var repswd = $('#re_pswd').val().replace(/ /g, '');
        var email = $('#email').val().replace(/ /g, '');
        var _id = GenerateHMAC('sha256', $('#id').val().replace(/ /g, ''));
        var _pswd = GenerateHMAC('sha256', $('#pswd').val().replace(/ /g, ''));
        var _email = GenerateHMAC('sha256', $('#email').val().replace(/ /g, ''));
        var is = false;
        var isU = false;
        var isL = false;
        var isN = false;
        var isS = false;
        var users;

        auth.firestore().collection('users').get().then(function (snapshot) {
            if (snapshot.size > 0) {
                var users;
                snapshot.forEach(function (doc) { users.push(doc.data()); });
            } else {
                users = [];
            }
            if (users.length > 0) {
                // ID, 이메일 검사
                for (let i = 1; i < users.length; i++) {
                    if (users[i]['id'] == _id || id.length == 0) {
                        $('#email').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
                        $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                        is = true;
                        break;
                    } else if (users[i]['email'] == _email || email.length == 0 || !email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
                        $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
                        $('#email').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                        is = true;
                        break;
                    }
                }
            } else if (users.length == 0) {
                if (id.length == 0) {
                    $('#email').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
                    $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                    is = true;
                } else if (email.length == 0 || !email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
                    $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
                    $('#email').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                    is = true;
                }
            }
            // 비밀번호 검사
            for (index in Upper) {
                if (pswd.includes(Upper[index]) == true) {
                    isU = true;
                    break;
                } else {
                    isU = false;
                }
            }

            for (index in Lower) {
                if (pswd.includes(Lower[index]) == true) {
                    isL = true;
                    break;
                } else {
                    isL = false;
                }
            }

            for (index in Nums) {
                if (pswd.includes(Nums[index]) == true) {
                    isN = true;
                    break;
                } else {
                    isN = false;
                }
            }

            for (index in Symbols) {
                if (pswd.includes(Symbols[index]) == true) {
                    isS = true;
                    break;
                } else {
                    isS = false;
                }
            }

            if ((isU || isL) && isN && isS) {
                $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
            } else {
                $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                is = true;
            }
            // 비밀번호 확인 검사
            if (repswd == pswd) {
                $('#re_pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
            } else {
                $('#re_pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                is = true;
            }
            if (!is) {
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
                    if (e.code == "auth/email-already-in-use") { $('#email').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088'); }
                });
            } else {
                $('#id').val('');
                $('#pswd').val('');
                $('#re_pswd').val('');
                $('#email').val('');
            }
        });
    }

    $('complete').click(function (event) {
        event.preventDefault();
        signup();
    });
});
