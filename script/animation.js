let isOpen = {"side" : false, "summary" : true, "api" : true, "basic" : true, "rhino" : true, "deepening" : true, "appendix" : true};

$(function(){
    if($("section#body").width > window.innerWidth / 80){
        location.reload();
    }

    $("div#blank").appendTo("div#sideBar");
    if($(window).width() > 800){
        $("header").css("width", window.innerWidth);
        $("section").css({"width" : window.innerWidth - $("div#side").width() - window.innerWidth / 22, "right" : "0"});
    }else{
        $("header").css({"width" : window.innerWidth - 52, "height" : "2em"});
        $("section#body section#summary").css("margin-top", "1em")
        $("section#body").css({"width" : $("section#summary").width, "padding-left" : "10em"});
        $("section#body > section").css({ "float" : "right" })
        $("div.content").css("width", window.innerWidth - 52);
    }
    

    $("dl span dt").click(function(event){
        let id = $(this).parent().attr('id');
        switch(isOpen[id]){
            case true:
                isOpen[id] = false;
                $("span#"+id+" dt").text($("span#"+id+" dt").text().replace("▽", "▷"));
                $("span#"+id+" dd").css("display", "none");
                break;
            case false:
                isOpen[id] = true;
                $("span#"+id+" dt").text($("span#"+id+" dt").text().replace("▷", "▽"));
                $("span#"+id+" dd").css("display", "block");
                break;
            default:
                return;
        }
        event.stopPropagation();
    });

    $("li.sA").click(function(event){
        let id = $(this).parent().attr("id");
        var offset = $("div#"+event.target.id.replace("d", "")).offset();
	    $("html").animate({scrollTop : offset.top - 155}, 1500, "swing");
    });

    $("dl span dd, li#sA").click(function(event){
        let id = $(this).parent().attr("id");
        var offset = $("div#"+event.target.id.replace("d", "")).offset();
	    $("html").animate({scrollTop : offset.top - 155}, 1500, "swing");
    });

    $("#kkotb_rfnc").click(function(){
        if($(window).width() > 800){
            location.reload();
        }
        else{
            $("div#sideBar").css("height", $(window).height() - $("header").height() - 2);
            switch(isOpen.side){
                case true:
                    isOpen.side = false;
                    $("div#sideBar").css("display", "none");
                    $("div#side").css("display", "none");
                    break;
                case false:
                    isOpen.side = true;
                    $("div#sideBar").css("display", "block").css("visibility", "visible");
                    $("div#side").css("display", "block").css("visibility", "visible");
                    break;
                default: return;
            }      
        }
    });

    
    $(".sdb").on("click", function(){
        if(window.outerWidth < 800){
            isOpen.side = false;
            $("div#sideBar").css("display", "none");
            $("div#side").css("display", "none");
        }
    });
    
    $("div#side").click(function(){
        if(window.outerWidth < 800){
            isOpen.side = false;
            $("div#sideBar").css("display", "none");
            $("div#side").css("display", "none");
        }
    });

    $(window).resize(function(){
        if(window.outerWidth > 800){
            location.reload();
        }
    });

    $("p#a").click(function(){
        window.open($(this).attr('class'));
    });

    $("p#thank_you").mouseover(function(){
        let rdcl = ["#00f1a9", "#a500f1", "#f100b5"];
        $("p."+$(this).attr("class")).css("color", rdcl[Math.floor(Math.random() * 3)]);
    });

    $("p#thank_you").mouseout(function(){
        $("p."+$(this).attr("class")).css("color", "#4b4b4b");
    });

    $("img#sttc").attr("title", "정적인 속성이나 메서드입니다.");
    $("img#prttp").attr("title", "프로토타입 속성이거나 프로토타입 메서드입니다.");
});



