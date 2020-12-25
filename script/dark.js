function getChangeDarkMode(){
    $("link#favicon").attr("href", "../../img/docs.png");

    $("#NF").attr("src", "../../img/NotFound_dark.png");
    $("#FBD").attr("src", "../../img/Forbidden_dark.png");
    $("#BR").attr("src", "../../img/BadRequest_dark.png");
}

function getChangeWhiteMode(){
    $("link#favicon").attr("href", "../../img/docs_black.png");

    $("#NF").attr("src", "../../img/NotFound.png");
    $("#FBD").attr("src", "../../img/Forbidden.png");
    $("#BR").attr("src", "../../img/BadRequest.png");
}

$(function(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && (theme() === 'system' || theme() === 'dark')) {
        getChangeDarkMode();
    }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if(e.matches && (theme() === 'system' || theme() === 'dark')){
        getChangeDarkMode();
    }
    else if(theme() === 'system' || theme() === 'white'){
        getChangeWhiteMode();
    }
});



    