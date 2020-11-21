let mouse = null;

$(function(){
    $("#toast_con").css("left", `${$(document).width() / 2 - ($("#toast_con").width() / 2)}px`);
    $('span#list').dequeue();
    
    $('aside').mouseenter(function(){
        $('span#list').dequeue();
        $('span#list').css({'left' : '0', 'opacity' : '0', 'display' : 'none'});
        $('span#list').css({'display' : 'block', 'visibility' : 'visible'});
        $('span#list').animate({'left' : '10rem'}, 300);
        setTimeout(function(){
            $('span#list').animate({'opacity' : '1'}, 300);
        }, 570);
    });
            
    $('aside').mouseleave(function(){
        $('span#list').dequeue();
        $('span#list').css({'left' : '10rem', 'opacity' : '1'});
        $('span#list').animate({'opacity' : '0'}, 300);
        $('span#list').animate({'left' : '0'}, 300);
        setTimeout(function(){
            $('span#list').css({'display' : 'none'});
        }, 600);
    });

    $('aside *').mouseenter(function(){
        $('span#list').dequeue();
        if($('span#list').css('left') == '0' && $('span#list').css('opacity') == '0' && $('span#list').css('display') == 'none'){
            $('span#list').css({'left' : '0', 'opacity' : '0', 'display' : 'none'});
            $('span#list').css({'display' : 'block', 'visibility' : 'visible'});
            $('span#list').animate({'left' : '10rem'}, 300);
            setTimeout(function(){
                $('span#list').animate({'opacity' : '1'}, 300);
            }, 570);
        }
    });

    $("dl span dd, li.sA").click(function(event){
        $('span#list').dequeue();
        var offset = $("div#"+event.target.id.replace("d", "")).offset();
        $('article').animate({opacity: "0"}, 700);
        setTimeout(function(){
            $("html").scrollTop(offset.top - '115');
            $('article').animate({opacity: "1"}, 700);
        }, 700); 
    });

    $("#docs").click(function(){
        location.reload();
    });

    
    $(".sdb").on("click", function(){
        if(window.innerWidth < 800){
            isOpen.side = false;
            $("div#sideBar").css("display", "none");
            $("div#side").css("display", "none");
        }
    });


    $("li.a").click(function(){
        window.open($(this).attr('id'));
    });

    $("p#thank_you").mouseover(function(){
        let rdcl = ["#00f1a9", "#a500f1", "#f100b5"];
        $("p."+$(this).attr("class")).css("color", rdcl[Math.floor(Math.random() * 3)]);
    });

    $("p#thank_you").mouseout(function(){
        $("p."+$(this).attr("class")).css("color", "#4b4b4b");
    });

    $("img.sttc").attr("title", "정적인 속성이나 메서드입니다.");
    $("img.prttp").attr("title", "프로토타입 속성이거나 프로토타입 메서드입니다.");
});
