function theme(s) {
    if (!!s) {
        //data-checked
        return true;
    } else {
        //set settings as 's'
        return true;
    }
}
function s(){
    save({'font_size': $('input#font_size').val(), 'font_norm': $('#font_norm').val(), 'font_code': $('#font_code').val(), 'theme': theme()});
}