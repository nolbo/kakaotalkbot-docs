$.getChangeDarkMode = function(){
    $("p#thank_you").css("color", "white");
    $("img#kkotb_rfnc").attr("src", "img/rfnc_dark.png");
    $("img#sttc").attr("src", "../../img/static_dark.png");
    $("img#prttp").attr("src", "../../img/prototype_dark.png");
    $("link#favicon").attr("href", "../../img/icon_dark.ico");

    $("p#thank_you").mouseover(function(){
        let rdcl = ["#00f1a9", "#a500f1", "#f100b5"];
        $("p."+$(this).attr("class")).css("color", rdcl[Math.floor(Math.random() * 3)]);
    });
    
    $("p#thank_you").mouseout(function(){
        $("p."+$(this).attr("class")).css("color", "#4b4b4b");
    });

    $("p#a").mouseout(function(){
        $("p."+$(this).attr("class")).css("color", "white");
    });

    $("p#thank_you").mouseout(function(){
        $("p#thank_you").css("color", "white");
    });

    $("#NF").attr("src", "../../img/NotFound_dark.png");
    $("#FBD").attr("src", "../../img/Forbidden_dark.png");
    $("#BR").attr("src", "../../img/BadRequest_dark.png");
}

$.getChangeWhiteMode = function(){
    $("p#thank_you").css("color", "#4b4b4b");
    $("img#kkotb_rfnc").attr("src", "img/kkotalkbot_rfnc.png");
    $("img#sttc").attr("src", "../../img/static.png");
    $("img#prttp").attr("src", "../../img/prototype.png");
    $("link#favicon").attr("href", "../../img/icon_dark.ico");

    $("p#a").mouseout(function(){
        $("p."+$(this).attr("class")).css("color", "#4b4b4b");
    });

    $("p#thank_you").mouseout(function(){
        $("p#thank_you").css("color", "#4b4b4b");
    });

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



    