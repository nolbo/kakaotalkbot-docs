function GenerateHMAC(key, payload) {
	var message = btoa(payload);
	var hash = CryptoJS.HmacSHA256(message, key);
	var hashInBase64 = CryptoJS.enc.Base64.stringify(hash).replace(/\//g, "|");
	return hashInBase64;
}

$(function(){
    $('button#complete').click(function(event){
        event.preventDefault();
        var _id = GenerateHMAC('sha256', $('#id').val().replace(/ /g, ''));
        var _pswd = GenerateHMAC('sha256', $('#pswd').val().replace(/ /g, ''));
        var DB = firebase.database().ref(_id);
        


        DB.on("value", function(snapshot) {
            var user = snapshot.val();

            if(user == undefined){
                $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #d1d1d1');
                $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                $('#id').val('');
                $('#pswd').val('');
            }else{
                if(user['password'] != _pswd){
                    $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #d1d1d1');
                    $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                    $('#id').val('');
                    $('#pswd').val('');
                }else{
                    $.cookie("id", _id, {
                        "domain" : "https://kkotbot-docs.kro.kr",
                        "path" : "/"
                   });
                    location.href = '';
                }
            }
        });
    });
});
