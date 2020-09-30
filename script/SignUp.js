function GenerateHMAC(key, payload) {
	var message = btoa(payload);
	var hash = CryptoJS.HmacSHA256(message, key);
	var hashInBase64 = CryptoJS.enc.Base64.stringify(hash).replace(/\//g, "|");
	return hashInBase64;
}

function writeUserData(id, pswd, email, db) {
    db.set({
        id: id,
        password: pswd,
        email: email,
        profile: $('img#profile').attr('src')
    });
    location.href = 'https://kkotbot-docs.kro.kr/login';
}

$(function(){
    function signup(){
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
        var DB = firebase.database().ref(_id);
        var DB2 = firebase.database().ref();
        var is = false;
        var isU = false;
        var isL = false;
        var isN = false;
        var isS = false;
        var users;
        
        DB2.on("value", function(snapshot) {
            users = Object.values(snapshot.val());
            if(users.length > 1){
                // ID, 이메일 검사
                for(let i = 1; i < users.length; i++){
                    if(users[i]['id'] == _id || id.length == 0){
                        $('#email').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
                        $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                        is = true;
                        break;
                    }else if(users[i]['email'] == _email || email.length == 0){
                        $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
                        $('#email').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                        is = true;
                        break;
                    }
                }
                // 비밀번호 검사
                for(index in Upper){
                    if(pswd.includes(Upper[index]) == true){
                        isU = true;
                        break;
                    }else{
                        isU = false;
                    }
                }
        
                for(index in Lower){
                    if(pswd.includes(Lower[index]) == true){
                        isL = true;
                        break;
                    }else{
                        isL = false;
                    }
                }
        
                for(index in Nums){
                    if(pswd.includes(Nums[index]) == true){
                        isN = true;
                        break;
                    }else{
                        isN = false;
                    }
                }
        
                for(index in Symbols){
                    if(pswd.includes(Symbols[index]) == true){
                        isS = true;
                        break;
                    }else{
                        isS = false;
                    }
                }
                if(isU == true && isL == true && isN == true && isS == true){
                    $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
                }else{
                    $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                    is = true;
                }
                // 비밀번호 확인 검사
                if(repswd == pswd){
                    $('#re_pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
                }else{
                    $('#re_pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                    is = true;
                }
                if(is == false){
                    writeUserData(_id, _pswd, _email, DB);
                }else{
                    $('#id').val('');
                    $('#pswd').val('');
                    $('#re_pswd').val('');
                    $('#email').val('');
                }
            }
            else if(users.length == 1){
                if(id.length == 0){
                    $('#email').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
                    $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                    is = true;
                }else if(email.length == 0){
                    $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
                    $('#email').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                    is = true;
                }
                 // 비밀번호 검사
                 for(index in Upper){
                    if(pswd.includes(Upper[index]) == true){
                        isU = true;
                        break;
                    }else{
                        isU = false;
                    }
                }
        
                for(index in Lower){
                    if(pswd.includes(Lower[index]) == true){
                        isL = true;
                        break;
                    }else{
                        isL = false;
                    }
                }
        
                for(index in Nums){
                    if(pswd.includes(Nums[index]) == true){
                        isN = true;
                        break;
                    }else{
                        isN = false;
                    }
                }
        
                for(index in Symbols){
                    if(pswd.includes(Symbols[index]) == true){
                        isS = true;
                        break;
                    }else{
                        isS = false;
                    }
                }
                if(isU == true && isL == true && isN == true && isS == true){
                    $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
                }else{
                    $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                    is = true;
                }
                // 비밀번호 확인 검사
                if(repswd == pswd){
                    $('#re_pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #b1b1b1');
                }else{
                    $('#re_pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                    is = true;
                }
                if(is == false){
                    writeUserData(_id, _pswd, _email, DB);
                }else{
                    $('#id').val('');
                    $('#pswd').val('');
                    $('#re_pswd').val('');
                    $('#email').val('');
                }
            }
        }); 
    }

    $('button').click(function(event){
        event.preventDefault();
        signup();
    });
});
