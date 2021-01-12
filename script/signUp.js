var con = (arr, str) => {
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
var Upper = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
var Lower = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
var Nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
var Symbols = ['~', '․', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', ']', '|', '\'', ';', ':', '‘', '“', '<', '>', ',', '.', '?', '/'];
$(function () {
    function signup() {
        const id = $('input#id').val().replace(/ /g, '');
        const pswd = $('#password').val().replace(/ /g, '');
        const repswd = $('#re-password').val().replace(/ /g, '');
        const email = $('#email').val().replace(/ /g, '');
        var is = false;
        const pwVal = con(Upper, pswd) && con(Lower, pswd) && con(Nums, pswd) && con(Symbols, pswd);
        if (id.length === 0) {
            $('#email').removeAttr('style');
            $('#id').css('box-shadow', '0rem 0rem 0.8rem 0rem #ff0088');
            $('#id').val('');
            is = true;
        } else if (email.length === 0 || !email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            $('#id').removeAttr('style');
            $('#email').css('box-shadow', '0rem 0rem 0.8rem 0rem #ff0088');
            $('#email').val('');
            is = true;
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

        if (!($('input#privacy').prop('checked') && $('input#location').prop('checked'))) {
            is = true;
        }

        if (!is) {
            console.log('create account');
            newA = true;
            var http = new XMLHttpRequest();
            var url = 'https://kbot-auth.herokuapp.com/user/create';
            var params = 'id=' + encodeURIComponent(id) + '&email=' + encodeURIComponent(email) + '&pw=' + encodeURIComponent(pswd) + '&profile=' + encodeURIComponent($('img#profile').attr('src'));
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            http.onreadystatechange = function () {
                if (http.readyState == 4) {
                    if (http.status == 200) {
                        location.href = location.origin + '/signin.html';
                    } else if (http.status == 400) {
                        newA = false;
                    }
                }
            }
            http.send(params);
        }

    }

    $('#complete').click(function (event) {
        event.preventDefault();
        signup();
    });
});
