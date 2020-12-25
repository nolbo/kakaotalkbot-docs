const LIST_ARRAY = ['summary', 'legacyAPI', 'API2', 'rhino', 'deepening', 'appendix', 'bookmark'];

$(function(){
    let thisId = $('article > section.docs_con').attr('id');

    $('aside dt').not('#bookmark').not(`#${thisId}`).click(function(){
        location.href = `${$(this).attr('id')}.html`;
    });

    $(`aside dt#bookmark`).click(function(event){
        if(isTool == false) {
            let ele = `aside > span#${$(this).attr('id')}`;

            for(txt of LIST_ARRAY){
                if($(`aside > span#${txt}`).css('opacity') == '1'){
                    $(`aside > span#${txt}`).animate({'opacity' : '0'}, 300);
                    setTimeout(function(){
                        $(`aside > span#${txt}`).css('display', 'none');
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