$.getChangeDarkMode = function(){
    $("link#favicon").attr("href", "../../img/docs.png");

    $("#NF").attr("src", "../../img/NotFound_dark.png");
    $("#FBD").attr("src", "../../img/Forbidden_dark.png");
    $("#BR").attr("src", "../../img/BadRequest_dark.png");
}

$.getChangeWhiteMode = function(){
    $("link#favicon").attr("href", "../../img/docs_black.png");

    $("#NF").attr("src", "../../img/NotFound.png");
    $("#FBD").attr("src", "../../img/Forbidden.png");
    $("#BR").attr("src", "../../img/BadRequest.png");
}

$(function(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        $.getChangeDarkMode();
    }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if(e.matches){
        $.getChangeDarkMode();
    }
    else{
        $.getChangeWhiteMode();
    }

    $("p#thank_you").mouseover(function(){
        let rdcl = ["#00f1a9", "#a500f1", "#f100b5"];
        $("p."+$(this).attr("class")).css("color", rdcl[Math.floor(Math.random() * 3)]);
    });

    $("p#thank_you").mouseout(function(){
        $("p."+$(this).attr("class")).css("color", "#4b4b4b");
    });
});



    