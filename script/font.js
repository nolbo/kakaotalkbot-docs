function font(s){
    $('input#font_size').val(s['font_size']);
    $('p.rangeTxt').text(s['font_size'] + '%');
    var fs = s['font_size'];
    fs = (Number(fs) / 100);
    if (window.innerWidth < 800) {
        $('span.list h1').css('font-size', 1.1 * fs + 'rem');
        $('span.list dd').css('font-size', 0.9 * fs + 'rem');
        $('p.title').css('font-size', 1.3 * fs + 'rem');
        $('p.stitle').css('font-size', 1.1 * fs + 'rem');
        $('p.dscrpt').css('font-size', 0.8 * fs + 'rem');
        $('p.code').not('#i').css('font-size', 9.3 * fs + 'px');
        $('p#i, i').css('font-size', 9.3 * fs + 'px');
        $('li.a, li.sA').css('font-size', 0.8 * fs + 'rem');
        $('li.dscrpt').css('font-size', 0.8 * fs + 'rem');
        $('div.code code').css('font-size', 0.7 * fs + 'rem');
        $('div.pls p.plsBox').css('font-size', 0.8 * fs + 'rem');
        $('div.crf p.crfBox').css('font-size', 0.8 * fs + 'rem');
        $('th, td').css('font-size', 0.8 * fs + 'rem');
        $('input#search_txt').css('font-size', 0.9 * fs + 'rem');
        $('p.rangeTxt').css('font-size', 0.9 * fs + 'rem');
        $('select.tool_sel').css('font-size', 0.8 * fs + 'rem');
    } else {
        $('*').css('font-size', 1 * fs + 'rem');
        $('span.list h1').css('font-size', 1.7 * fs + 'rem');
        $('span.list dd').css('font-size', 1.1 * fs + 'rem');
        $('p.title').css('font-size', 1.9 * fs + 'rem');
        $('p.stitle').css('font-size', 1.4 * fs + 'rem');
        $('p.code').not('#i').css('font-size', 0.9 * fs + 'rem');
        $('p#i, i').css('font-size', 11.7 * fs + 'px');
        $('li.a, li.sA').css('font-size', 1 * fs + 'rem');
        $('div.code code').css('font-size', 0.9 * fs + 'rem');
        $('div.pls p.plsBox').css('font-size', 0.9 * fs + 'rem');
        $('div.crf p.crfBox').css('font-size', 0.9 * fs + 'rem');
        $('input#search_txt').css('font-size', 1.3 * fs + 'rem');
        $('p.rangeTxt').css('font-size', 1 * fs + 'rem');
        $('input[type=range]:hover + p.rangeTxt').css('font-size', 1.5 * fs + 'rem');
    }
    $('#font_norm').val(s['font_norm']);
    $("*").css('font-family', '\'' + {
        'Noto Sans': 'Noto Sans',
        '나눔고딕': 'NG',
        '나눔바른고딕': 'NBG',
        '나눔스퀘어': 'NS',
        '나눔스퀘어라운드': 'NSR',
        '나눔바른펜': 'NBP',
        '나눔명조': 'NM',
        '마루부리': 'MB'
    }[s['font_norm']] + '\', \'Noto Sans KR\'');
    $('#font_code').val(s['font_code']);
    $("p.code, div.code code span, div.code code, .hljs, .hljs *").css('font-family', '\'' + {
        'JetBrains Mono': 'JetBrains Mono',
        'D2 Coding': 'D2Coding',
        'Consolas': 'Con',
        'IBM Plex Mono': 'IBM',
        'Hack': 'H',
        'Ubuntu Mono': 'UbM',
        'Monaco': 'Mon'
    }[s['font_code']] + '\', \'D2Coding\'');
    $("i, .hljs-comment, .hljs-keyword, .hljs-literal, .hljs-emphasis, p#i").css('font-family', '\'' + {
        'JetBrains Mono': 'JetBrains Mono I',
        'D2 Coding': 'D2Coding',
        'Consolas': 'Con I',
        'IBM Plex Mono': 'IBM I',
        'Hack': 'H I',
        'Ubuntu Mono': 'UbM I',
        'Monaco': 'Mon'
    }[s['font_code']] + '\', \'D2Coding\'');
}