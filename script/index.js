$(function () {
    var canvas = document.getElementById('canvas');
    var x = 0.1;
    var ts = 0;
    var tempo=1
    var tempt=1
    var tempr=1
    // var itv = setInterval(function(){

    //     ts+=1
    //     /*var tempo = 1+[-1,1][Math.floor(Math.random()*2)]*(Math.random()*0.2);
    //   var tempt = 1+[-1,1][Math.floor(Math.random()*2)]*(Math.random()*0.2);
    //   var tempr = 1+[-1,1][Math.floor(Math.random()*2)]*(Math.random()*0.2);*/
    //     tempo = (1+Math.cos(1+ts/20)/45);
    //     tempt = (1+Math.cos(2+ts/15)/40);
    //     tempr = (1+Math.cos((ts/17))/5);
      
      
    //     if(canvas.getContext) {
    //     var ctx = canvas.getContext('2d');

    //     // Cubic curves example
    //         ctx.beginPath();
    //         ctx.moveTo(0, 0);
    //         ctx.lineTo(1804*x, 0);
    //         ctx.lineTo(1804*x, 1245*x)
    //         ctx.bezierCurveTo(1804*x, 1245*x, (1804-140.385)*x, (1245-348.43357)*x, (1804-292.26)*x, (1245-434.41939)*x*tempo);
    //         ctx.bezierCurveTo(1301.8091*x,691.72575*x,986.67378*x,911.40884*x,788.98432*x*(2-tempt),773.14704*x*tempt);
    //         ctx.bezierCurveTo(600.6037*x,641.39574*x,692.8308*x,289.126*x,519.20993*x,138.45598*x*tempr);
    //         ctx.bezierCurveTo(383.9291*x,21.057851*x,0,0,0,0);
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         //ctx.stroke()
    //         ctx.fill();
    //     }
    // }, 10);

    $('img#login_img').click(function () {
        location.href = 'signin.html';
    });

    $('div.block').click(function() {
        location.href = `${$(this).attr('id')}.html`;
    });

    $('article#notice').click(function() {
        window.open('https://github.com/nolbo/kakaotalkbot-docs');
    });

    var pathEl = document.getElementById('path26');
    var offset = anime.setDashoffset(pathEl);

    $('#notice *, #main *').css('opacity', '0');

    pathEl.setAttribute('stroke-dashoffset', offset);
    anime({
        targets: pathEl,
        strokeDashoffset: [offset, 0],
        duration: 2000,
        delay: 500,
        loop: false,
        direction: 'alternate',
        easing: 'easeInOutSine',
        autoplay: true
    });
    setTimeout(function() {
        $('article#notice *').animate({'opacity' : '1'}, 500);
        $('#main > .block').each(async (index, item) => {
          await new Promise(resolve => setTimeout(resolve, index * 100));
          item.style.transition = '800ms';
          item.style.opacity = '1';
          item.querySelectorAll('*').forEach(element => element.style.opacity = '1');
        });
    }, 400);
    // setTimeout(function () {
    //     $('#top_txt').animate({ 'opacity': '1' }, 300);
    //     $('#arrow').animate({ 'opacity': '1' }, 300);
    //     setTimeout(function () {
    //         $('#arrow').animate({ 'padding-top': '2rem' }, 300);
    //         setTimeout(function () {
    //             $('#arrow').animate({ 'padding-top': '0rem' }, 300);
    //         }, 300);
    //     }, 300);
    // }, 2500);
});

$(function(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        getChangeDarkMode();
    }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if(e.matches){
        getChangeDarkMode();
    }
    else {
        getChangeWhiteMode();
    }
});
