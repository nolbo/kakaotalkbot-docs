var theme
$(function () {
    theme = function (s) {
        if (!s) {
            if ($('#system').attr('data-checked')) {
                return 'system';
            } else if ($('#dark').attr('data-checked')) {
                return 'dark';
            } else if ($('#white').attr('data-checked')) {
                return 'light';
            }
        } else {
            //set settings as 's'
            return 'true';
        }
    }
    $('#white').click(function () {
        $('#system').attr('data-checked', 'false');
        $('#white').attr('data-checked', 'true');
        $('#dark').attr('data-checked', 'false');
        s();
        $('#t_dark').attr('media', 'asdf');
    })
    $('#dark').click(function () {
        $('#system').attr('data-checked', 'false');
        $('#white').attr('data-checked', 'false');
        $('#dark').attr('data-checked', 'true');
        s();
        $('#t_dark').removeAttr('media');
    })
    $('#system').click(function () {
        $('#system').attr('data-checked', 'true');
        $('#white').attr('data-checked', 'false');
        $('#dark').attr('data-checked', 'false');
        s();
        $('#t_dark').attr('media', '(prefers-color-scheme: dark)');
        $('#t_light').attr('media', '(prefers-color-scheme: light)');
    })
    function s() {
        save({ 'font_size': $('input#font_size').val(), 'font_norm': $('#font_norm').val(), 'font_code': $('#font_code').val(), 'theme': theme() });
    }
})