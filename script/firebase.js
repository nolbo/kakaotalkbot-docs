var auth, save, uSet;
$(function () {
    $.getScript('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js', function () {
        $.getScript('https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js', function () {
            $.getScript('https://www.gstatic.com/firebasejs/8.1.1/firebase-auth.js', function () {
                $.getScript('https://www.gstatic.com/firebasejs/8.1.1/firebase-firestore.js', function () {
                    // Your web app's Firebase configuration
                    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
                    var firebaseConfig = {
                        apiKey: "AIzaSyC2uqV1aTqbeV8Ns10-9UeTBV5UWBlQ1AI",
                        authDomain: "kakaotalkbot-docs.firebaseapp.com",
                        databaseURL: "https://kakaotalkbot-docs.firebaseio.com",
                        projectId: "kakaotalkbot-docs",
                        storageBucket: "kakaotalkbot-docs.appspot.com",
                        messagingSenderId: "209657729121",
                        appId: "1:209657729121:web:94edd905e7135f9f315a20",
                        measurementId: "G-ET1Y9WY3Y8"
                    };
                    // Initialize Firebase
                    firebase.initializeApp(firebaseConfig);
                    firebase.analytics();
                    // for auth
                    var authConfig = {
                        apiKey: "AIzaSyAXnru9ZZfqXSz50zAZJIo6n2UnWph3FYk",
                        authDomain: "kbot-auth.firebaseapp.com",
                        databaseURL: "https://kbot-auth.firebaseio.com",
                        projectId: "kbot-auth",
                        storageBucket: "kbot-auth.appspot.com",
                        messagingSenderId: "766140475780",
                        appId: "1:766140475780:web:05f3af8ee9f77d403e15d1",
                        measurementId: "G-37EGKPJBSX"
                    };
                    auth = firebase.initializeApp(authConfig, "other");
                    auth.auth().onAuthStateChanged(function (user) {
                        uSet = function (s) {
                            $('input#font_size').val(s['font_size']);
                            $('p.rangeTxt').text($('input#font_size').val() + '%');
                            var fs = s['font_size'];
                            fs = (Number(fs) / 100);
                            if (window.innerWidth < 800) {
                                $('span#list h1').css('font-size', 1.1 * fs + 'rem');
                                $('span#list dd').css('font-size', 0.9 * fs + 'rem');
                                $('p.title').css('font-size', 1.3 * fs + 'rem');
                                $('p.stitle').css('font-size', 1.1 * fs + 'rem');
                                $('p.dscrpt').css('font-size', 0.8 * fs + 'rem');
                                $('p.code').css('font-size', 9.3 * fs + 'px');
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
                                $('span#list h1').css('font-size', 1.7 * fs + 'rem');
                                $('span#list dd').css('font-size', 1.1 * fs + 'rem');
                                $('p.title').css('font-size', 1.9 * fs + 'rem');
                                $('p.stitle').css('font-size', 1.4 * fs + 'rem');
                                $('p.code').css('font-size', 0.9 * fs + 'rem');
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
                            $("p.code").css('font-family', '\'' + {
                                'JetBrains Mono': 'JetBrains Mono',
                                'D2 Coding': 'D2Coding',
                                'Consolas': 'Con',
                                'IBM Plex Mono': 'IBM',
                                'Hack': 'H',
                                'Ubuntu Mono': 'UbM',
                                'Monaco': 'Mon'
                            }[s['font_code']] + '\', \'D2Coding\'');
                            $("div.code code").css('font-family', '\'' + {
                                'JetBrains Mono': 'JetBrains Mono',
                                'D2 Coding': 'D2Coding',
                                'Consolas': 'Con',
                                'IBM Plex Mono': 'IBM',
                                'Hack': 'H',
                                'Ubuntu Mono': 'UbM',
                                'Monaco': 'Mon'
                            }[s['font_code']] + '\', \'D2Coding\'');
                            $("i").css('font-family', '\'' + {
                                'JetBrains Mono': 'JetBrains Mono I',
                                'D2 Coding': 'D2Coding',
                                'Consolas': 'Con',
                                'IBM Plex Mono': 'IBM I',
                                'Hack': 'H I',
                                'Ubuntu Mono': 'UbM I',
                                'Monaco': 'Mon'
                            }[s['font_code']] + '\', \'D2Coding\'');
                            theme(s['theme']);
                        }

                        window.onunload = function () {
                            save({ 'font_size': $('input#font_size').val(), 'font_norm': $('#font_norm').val(), 'font_code': $('#font_code').val(), 'theme': theme() }, true);
                        }

                        if (user) {
                            if (["/signup", "/signin", "/signup.html", "/signin.html"].indexOf(location.href.substring(location.origin.length)) != -1) {
                                location.href = location.origin;
                            } else {
                                var db = firebase.firestore();
                                db.collection("project").doc("views").update({
                                    total: firebase.firestore.FieldValue.increment(1)
                                });
                                auth.firestore().collection('users').doc(auth.auth().currentUser.uid).collection('docs').doc('data').get().then(function (doc) {
                                    if (doc.exists) {
                                        a = doc.data();
                                        if (!!a.settings) {
                                            uSet(a.settings);
                                        }
                                        if (!!a.bookmark) {
                                            // 북마크 업뎃
                                        }
                                    }
                                })
                                // 로그인바 업뎃
                                var lastSave = Date.now();
                                save = function (set, f) {
                                    if (Date.now() > (lastSave + 30000) || f === true) {
                                        auth.firestore().collection('users').doc(auth.auth().currentUser.uid).collection('docs').doc('data').update({
                                            'settings': set
                                        });
                                    }
                                    uSet(set);
                                }
                                /*
                                auth.firestore().collection('users').doc(auth.auth().currentUser.uid).collection('docs').doc('data').update({
                                    'bookmark': firebase.firestore.FieldValue.arrayUnion({
                                        'location': location.href.substring(location.origin.length),
                                        'pos': window.scrollY,
                                        'ts': (new Date).toString()
                                    })
                                })*/
                            }
                        } else {
                            save = function (e) {
                                uSet(e);
                                return true;
                            }
                        }
                    });
                });
            });
        });
    });
});
