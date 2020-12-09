const LIST_ARRAY = ['summary', 'legacyAPI', 'API2', 'rhino', 'deepening', 'appendix', 'bookmark'];

$(function(){
    function sideBar(){
        if($(document).scrollTop() == 0 || ($(document).scrollTop() + 400 >= $('section#summary').offset().top)){
            $('dt img').removeAttr('id');
            $('span#list').attr('data-isVisible', 'false');
            $('dt img[src = "img/summary.png"]').attr('id', 'this');
            $('span.summary').attr('data-isVisible', 'true');
        }
        if($(document).scrollTop() + 400 >= $('section#legacyAPI').offset().top){
            $('dt img').removeAttr('id');
            $('span#list').attr('data-isVisible', 'false');
            $('dt img[src = "img/api.png"]').attr('id', 'this');
            $('span.legacyAPI').attr('data-isVisible', 'true');
        }
        if($(document).scrollTop() + 400 >= $('section#API2').offset().top){
            $('dt img').removeAttr('id');
            $('span#list').attr('data-isVisible', 'false');
            $('dt img[src = "img/api2.png"]').attr('id', 'this');
            $('span.API2').attr('data-isVisible', 'true');
        }
        if($(document).scrollTop() + 400 >= $('section#rhino').offset().top){
            $('dt img').removeAttr('id');
            $('span#list').attr('data-isVisible', 'false');
            $('dt img[src = "img/rhino.png"]').attr('id', 'this');
            $('span.rhino').attr('data-isVisible', 'true');
        }
        // if($(document).scrollTop() >= $('section#deepening').offset().top){
        //     $('dt img[src = "../img/deepening.png"]').attr('id', 'this');
        //     $('span.deepening').attr('data-isVisible', 'true');
        // }
        if($(document).scrollTop() + 400 >= $('section#appendix').offset().top){
            $('dt img').removeAttr('id');
            $('span#list').attr('data-isVisible', 'false');
            $('dt img[src = "img/appendix.png"]').attr('id', 'this');
            $('span.appendix').attr('data-isVisible', 'true');
        }
    }

    sideBar();

    $(window).scroll(function(){
        sideBar();
    });

    $('aside dt').click(function(event){
        if(isTool == false) {
            let ele = `span.${$(this).attr('id')}`;

            for(txt of LIST_ARRAY){
                if($(`span.${txt}`).css('opacity') == '1'){
                    $(`span.${txt}`).animate({'opacity' : '0'}, 300);
                    setTimeout(function(){
                        $(`span.${txt}`).css('display', 'none');
                    }, 300);
                    break;
                }
            }
            $(ele).animate({'opacity' : '1'}, 300);
            $(ele).css({'display' : 'block', 'visibility' : 'visible'});
        }else{
            event.preventDefault();
        }
    });
});