let mouse = null;
const SPAN_LIST = 'span[data-isVisible = "true"]';

$(function(){
    $("#toast_con").css("left", `${$(document).width() / 2 - ($("#toast_con").width() / 2)}px`);
    $('span#list').dequeue();
    if($(window).width() < 801){
        $('div#docs_fun').offset({
            top: $(window).height() - 36
        });
        $('div#autocomplete').offset({
            top: $(window).height() - 36
        });
    }
    $(window).resize(function(){
        if($(window).width() < 801){
            $('div#docs_fun').offset({
                top: $(window).height() - 36
            });
            $('div#autocomplete').offset({
                top: $(window).height() - 36
            });
        }else{
            $('div#docs_fun').removeAttr('style');
        }
    });
    
    
    
    $('aside, aside *, span#list').mouseenter(function(){
        if(Math.floor(Number($(SPAN_LIST).css('left').replace('px', ''))) <= '30' && $(SPAN_LIST).css('opacity') == '0' && $(SPAN_LIST).css('display') == 'none'){
            $('span#list, form').dequeue();
            $('body').css('overflow', 'hidden');
            $('body').css('touch-action', 'none');
            $('div#autocomplete').css({'display' : 'block', 'visibility' : 'visible', 'opacity' : '0'});
            $(SPAN_LIST + ', form').css({'left' : '0', 'opacity' : '0', 'display' : 'none'});
            $(SPAN_LIST + ', form').css({'display' : 'block', 'visibility' : 'visible'});
            if(window.innerWidth > 800) {
                $('span#list, form').animate({'left' : '10rem'}, 300);
            }else{
                $('span#list, form').animate({'left' : '5rem'}, 300);
            }
            setTimeout(function(){
                $(SPAN_LIST + ', form, div#autocomplete').animate({'opacity' : '1'}, 300);
            }, 570);
        }
    });
            
    $('aside').mouseleave(function(){
        $('span#list, input').dequeue();
        $('body').css('overflow', 'visible');
        $('aside, aside *').css('overflow', '');
        $('body').css('touch-action', 'auto');
        if(window.innerWidth > 800){
            $('span#list, form').css({'left' : '10rem'});
        }else{
            $('span#list, form').css({'left' : '5rem'});
        }
        $('span#list, form, div#autocomplete').animate({'opacity' : '0'}, 300);
        $('span#list, form').animate({'left' : '0'}, 300);
        setTimeout(function(){
            $('span#list, form, div#autocomplete').css({'display' : 'none'});
        }, 600);
    });

    $("dl span dd, li.sA").click(function(event){
        $(SPAN_LIST + ', form').dequeue();
        var offset = $("div#" + event.target.id.replace("d", "")).offset();
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

    $("img.sttc").attr("title", "정적인 속성이나 메서드입니다.");
    $("img.prttp").attr("title", "프로토타입 속성이거나 프로토타입 메서드입니다.");
});
