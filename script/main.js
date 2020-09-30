$(function(){
    if($.cookie('id') == undefined){
        location.href = 'index.html';
    }else{
        var DB = firebase.database().ref($.cookie('id'));
        alert('1');
        DB.on("value", function(snapshot) {
            var users = snapshot.val();
            alert(JSON.stringify(users));
            $('img#profile').attr('src', users['profile']);
        });
    }
})