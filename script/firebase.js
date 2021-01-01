var auth, save, uSet, newA = false;
$(function () {
    $('#arrow').fadeOut();
    var ver = '8.2.1';
    $.getScript('https://www.gstatic.com/firebasejs/' + ver + '/firebase-app.js', function () {
        $.getScript('https://www.gstatic.com/firebasejs/' + ver + '/firebase-analytics.js', function () {
            $.getScript('https://www.gstatic.com/firebasejs/' + ver + '/firebase-auth.js', function () {
                $.getScript('https://www.gstatic.com/firebasejs/' + ver + '/firebase-database.js', function () {
                    $.getScript('https://www.gstatic.com/firebasejs/' + ver + '/firebase-firestore.js', function () {
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

                        var db = firebase.database();
                        db.ref('project').once('value').then((snapshot) => {
                            var v = snapshot.val()
                            db.ref('project').update({
                                views: v.views + 1,
                                online: v.online + 1
                            });
                        });
                        db.ref('project').on('value', (snapshot) => {
                            const data = snapshot.val();
                            $('#arrow').fadeIn()
                            $('p#view_txt').prop('Counter', $('p#view_txt').text()).animate({
                                Counter: data.views
                            }, {
                                duration: 1000,
                                easing: 'swing',
                                step: function (now) {
                                    $('p#view_txt').text(Math.ceil(now));
                                    if (Math.ceil(now) == data.views) {
                                        $('#arrow').fadeOut();
                                    }
                                }
                            });
                            if ($('p#online_txt').text() > data.online) {
                                $('#arrow').attr('src', 'img/arrow.png')
                            }
                            $('p#online_txt').prop('Counter', $('p#online_txt').text()).animate({
                                Counter: data.online
                            }, {
                                duration: 1000,
                                easing: 'swing',
                                step: function (now) {
                                    $('p#online_txt').text(Math.ceil(now));
                                    if (Math.ceil(now) == data.online) {
                                        $('#arrow').fadeOut();
                                        $('#arrow').attr('src', 'img/arrow_up.png')
                                    }
                                }
                            });
                        });
                        $(window).on('beforeunload', function () {
                            db.ref('project').once('value').then((snapshot) => {
                                var v = snapshot.val()
                                db.ref('project').update({
                                    online: v.online - 1
                                });
                            });
                        });
                        auth = firebase.initializeApp(authConfig, "other");
                        auth.auth().onAuthStateChanged(function (user) {
                            if (["/signup", "/signin", "/signup.html", "/signin.html", "/", "/index", "/index.html"].indexOf(location.href.substring(location.origin.length)) == -1) {
                                uSet = function (s) {
                                    font(s);
                                    theme(s['theme']);
                                }
                                $('input#font_size').on('mouseup', function () {
                                    s();
                                });
                                window.onunload = function () {
                                    save({
                                        'font_size': $('input#font_size').val(),
                                        'font_norm': $('#font_norm').val(),
                                        'font_code': $('#font_code').val(),
                                        'theme': theme()
                                    }, true);
                                }
                            }

                            if (user) {
                                if (!newA && ["/signup", "/signin", "/signup.html", "/signin.html"].indexOf(location.href.substring(location.origin.length)) != -1) {
                                    location.href = location.origin;
                                } else {
                                    auth.firestore().collection('users').doc(auth.auth().currentUser.uid).get().then(function (doc) {
                                        $('#login_img').attr('src', doc.data().profile);
                                        $('#login_txt').text(doc.data().id);
                                    });
                                    if (["/signup", "/signin", "/signup.html", "/signin.html", "/", "/index", "/index.html"].indexOf(location.href.substring(location.origin.length)) == -1) {
                                        auth.firestore().collection('users').doc(auth.auth().currentUser.uid).collection('docs').doc('data').get().then(function (doc) {
                                            if (doc.exists) {
                                                a = doc.data();
                                                if (!!a.settings) {
                                                    setTimeout(() => {
                                                        uSet(a.settings);
                                                    }, 5000);
                                                }
                                                if (!!a.bookmark) {
                                                    t = $('span#bookmark')[0];
                                                    a.bookmark.forEach((elem) => {
                                                        var b = document.createElement("span");
                                                        b.className = "sideList";
                                                        var c = document.createElement("dd");
                                                        c.innerText = elem.ttl;
                                                        c.className = "sdb";
                                                        c.addEventListener("click", function (e) {
                                                            if (e.detail === 1) {
                                                                $([document.documentElement, document.body]).animate({
                                                                    scrollTop: elem.pos - 150
                                                                }, 500);
                                                            } else if (e.detail === 2) {
                                                                auth.firestore().collection('users').doc(auth.auth().currentUser.uid).collection('docs').doc('data').update({
                                                                    'bookmark': firebase.firestore.FieldValue.arrayRemove(elem)
                                                                })
                                                                c.remove();
                                                            }
                                                        });

                                                        b.appendChild(c);
                                                        t.appendChild(b);
                                                    });
                                                }
                                            }
                                        })
                                        $('p.title, p.stitle').each(function (e, t) {
                                            t.onclick = function () {
                                                var k = {
                                                    'location': location.href.substring(location.origin.length),
                                                    'pos': t.offsetTop,
                                                    'ttl': t.innerText,
                                                    'ts': (new Date).toString()
                                                };
                                                auth.firestore().collection('users').doc(auth.auth().currentUser.uid).collection('docs').doc('data').update({
                                                    'bookmark': firebase.firestore.FieldValue.arrayUnion(k)
                                                })
                                                var elem;
                                                t = $('span#bookmark')[0];
                                                elem = k;
                                                var b = document.createElement("span");
                                                b.className = "sideList";
                                                var c = document.createElement("dd");
                                                c.innerText = elem.ttl;
                                                c.className = "sdb";
                                                c.addEventListener("click", function (e) {
                                                    if (e.detail === 1) {
                                                        $([document.documentElement, document.body]).animate({
                                                            scrollTop: elem.pos - 150
                                                        }, 500);
                                                    } else if (e.detail === 2) {
                                                        auth.firestore().collection('users').doc(auth.auth().currentUser.uid).collection('docs').doc('data').update({
                                                            'bookmark': firebase.firestore.FieldValue.arrayRemove(elem)
                                                        })
                                                        c.remove();
                                                    }
                                                });
                                                b.appendChild(c);
                                                t.appendChild(b);

                                            }
                                        });
                                        var lastSave = Date.now();

                                        save = function (set, f) {
                                            if (Date.now() > (lastSave + 30000) || f === true) {
                                                auth.firestore().collection('users').doc(auth.auth().currentUser.uid).collection('docs').doc('data').update({
                                                    'settings': set
                                                });
                                            }
                                            uSet(set);
                                        }
                                    } else {
                                        save = function (e) {
                                            uSet(e);
                                            return true;
                                        }
                                    }
                                }
                            } else {
                                save = function (e) {
                                    uSet(e);
                                    return true;
                                }
                            }
                            $.getScript('https://www.gstatic.com/firebasejs/' + ver + '/firebase-performance.js', function () { });
                        });
                    });
                });
            });
        });
    });
});