$(function(){
    $('img.icon').click(function(){
        location.href = `${$(this).attr('id')}.html`;
    });

    $('img#login').click(function(){
        location.href = 'signin.html';
    })
});