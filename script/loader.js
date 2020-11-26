var d = new Date;
var date = d.getMonth() + 1 + '/' + d.getDate().toString();
if ([].indexOf(date) != -1) {
    // 추석 등
    $('#loader_img').attr('src', location.origin + '/img/holiday.jpg');
} else if ([].indexOf(date) != -1) {
    // 독립기념일 등
    $('#loader_img').attr('src', location.origin + '/img/korea.jpg');
} else if (date == "12/25") {
    // 크리스마스
    $('#loader_img').attr('src', location.origin + '/img/christmas.jpg');
} else {
    $('#loader_img').attr('src', location.origin + '/img/grp.jpg');
}
$(function () {
    setTimeout(function () {
        $('#loader').animate({ opacity: "0" }, 700);
        $('#loader').css({ 'display': 'none' });
        setTimeout(function () {
            $('#main').animate({ opacity: "1" }, 700);
        }, 700);
    }, 2000);
})