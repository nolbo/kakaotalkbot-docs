$(function(){
    if(!firebase.auth().currentUser){
        location.href = 'index.html';
    }else{
        var DB = firebase.database().ref(firebase.auth().currentUser.uid);
        DB.once("value").then(function(snapshot) {
            var user = snapshot.val();
            $('img#profile').attr('src', users['profile']);
        });
    }
})
