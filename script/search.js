/*
2020 @franknoh search.js
*/

// 'https://open-korean-text-api.herokuapp.com/extractPhrases?text='

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