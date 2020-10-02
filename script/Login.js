function GenerateHMAC(key, payload) { //암호화 함수
    var message = btoa(payload);
    var hash = CryptoJS.HmacSHA256(message, key);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash).replace(/\//g, "|");
    return hashInBase64;
}

$(function() {
    if (!!firebase.auth().currentUser) {
        location.href = 'https://kkotbot-docs.kro.kr/';
    }
    $('button#complete').click(function(event) {
        event.preventDefault();
        firebase.database().ref().once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val().id == $('#id').val()) {
                    _email == childSnapshot.val().email
                }
            })
        })
        firebase.auth().signInWithEmailAndPassword(_email, $('#pswd').val()).catch(function(error) {
            $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #d1d1d1');
            $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
            $('#id').val('');
            $('#pswd').val('');
        });
        var _id = GenerateHMAC('sha256', $('#id').val().replace(/ /g, ''));
        var _pswd = GenerateHMAC('sha256', $('#pswd').val().replace(/ /g, ''));
        var DB = firebase.database().ref(firebase.auth().currentUser.uid);



        DB.once("value").then(function(snapshot) {
            var user = snapshot.val();

            if (user == undefined) { //id가 없을때
                $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #d1d1d1');
                $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                $('#id').val('');
                $('#pswd').val('');
            } else {
                location.href = 'https://kkotbot-docs.kro.kr/'; //로그인 후 이동
            }
        });
    });
});
