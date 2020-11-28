/*
2020 @franknoh search.js
*/


var search = [
    {
        'keys': [],
        'location': ''
    }
];

function get_key(txt) {
    $.get('https://open-korean-text-api.herokuapp.com/extractPhrases?text=' + txt)
        .done(function (data) {
            return data.phrases[0];
        });
}

function get_pos(str) {
    var obj = get_key(str);
    search.forEach((e) => {
        if (e.keys.indexOf(obj) != -1) {
            return e.location;
        }
    });
    return false;
}