$(function(){
    $('aside dt').click(function(){
        location.href = `${$(this).attr('id')}.html`;
    });
});