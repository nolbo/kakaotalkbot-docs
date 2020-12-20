
function setToast() {
    let type = 'default';
    let content;

    if (arguments.length === 1) {
        content = arguments[0];
    } else if (arguments.length === 2) {
        type = arguments[0];
        content = arguments[1];
    }
    $('div#toast_con').css({
        'display': 'block',
        'visibility': 'visible',
        'opacity': '0'
    });
    $(function () {
        $('div#toast_con').attr('class', type);
        $('p#toast_txt').text(content);
    });
    $('div#toast_con').animate({ opacity: "1" }, 500);
    setTimeout(function () {
        $('div#toast_con').animate({ opacity: "0" }, 500);
    }, 3000);

}