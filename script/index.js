$(function(){
    $('img.icon').click(function(){
        location.href = `${$(this).attr('id')}.html`;
    });

    $('img#login').click(function(){
        location.href = 'signin.html';
    });

    var pathEls = document.querySelectorAll('path');

    for (var i = 0; i < pathEls.length; i++) {
        var pathEl = pathEls[i];
        var offset = anime.setDashoffset(pathEl);

        pathEl.setAttribute('stroke-dashoffset', offset);
        anime({
          targets : pathEl,
          strokeDashoffset : [offset, 0],
          duration : 2000,
          delay : 500,
          loop : false,
          direction : 'alternate',
          easing : 'easeInOutSine',
          autoplay : true
        });
    }
    setTimeout(function(){
        $('#top_txt').animate({ 'opacity': '1' }, 300);
    }, 2500);
});