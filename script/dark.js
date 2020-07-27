
$(function(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        $("#kkotb_rfnc").attr("src", "img/rfnc_dark.png");
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'img/icon_dark.ico';
        document.getElementsByTagName('head')[0].appendChild(link);

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

        $("#NF").attr("src", "img/NotFound_dark.png");
    }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if(e.matches){
        $("p#thank_you").css("color", "white");
        $("#kkotb_rfnc").attr("src", "img/rfnc_dark.png");
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'img/icon_dark.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
        $("p#a").mouseout(function(){
            $("p."+$(this).attr("class")).css("color", "white");
        });

        $("p#thank_you").mouseout(function(){
            $("p#thank_you").css("color", "white");
        });
        $("#NF").attr("src", "img/NotFound_dark.png");
    }
    else{
        $("p#thank_you").css("color", "#4b4b4b");
        $("#kkotb_rfnc").attr("src", "img/kkotalkbot_rfnc.png");
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'img/icon.ico';
        document.getElementsByTagName('head')[0].appendChild(link);

        $("p#a").mouseout(function(){
            $("p."+$(this).attr("class")).css("color", "#4b4b4b");
        });

        $("p#thank_you").mouseout(function(){
            $("p#thank_you").css("color", "#4b4b4b");
        });
        $("#NF").attr("src", "img/NotFound.png");
    }

    $("p#thank_you").mouseover(function(){
        let rdcl = ["#00f1a9", "#a500f1", "#f100b5"];
        $("p."+$(this).attr("class")).css("color", rdcl[Math.floor(Math.random() * 3)]);
    });

    $("p#thank_you").mouseout(function(){
        $("p."+$(this).attr("class")).css("color", "#4b4b4b");
    });
});



    