$(function () {
    $('img.icon').click(function () {
        location.href = `${$(this).attr('id')}.html`;
    });

    $('img#login').click(function () {
        location.href = 'signin.html';
    });

    var pathEl = document.getElementById('path26');

    var offset = anime.setDashoffset(pathEl);

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
    setTimeout(function () {
        $('#top_txt').animate({ 'opacity': '1' }, 300);
        $('#arrow').animate({ 'opacity': '1' }, 300);
        setTimeout(function () {
            $('#arrow').animate({ 'padding-top': '2rem' }, 300);
            setTimeout(function () {
                $('#arrow').animate({ 'padding-top': '0rem' }, 300);
            }, 300);
        }, 300);
    }, 2500);
});