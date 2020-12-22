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
                            font(s);
                            theme(s['theme']);
                        }
                        $('input#font_size').on('mouseup', function () {
                            s();
                        });
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
                                            setTimeout(() => {
                                                uSet(a.settings);
                                            }, 5000);
                                        }
                                        if (!!a.bookmark) {
                                            a.bookmark.forEach(element => {
                                                //
                                            });
                                        }
                                    }
                                })
                                $('p.title, p.stitle').each(function(e, t){
                                    t.onclick = function(){
                                        auth.firestore().collection('users').doc(auth.auth().currentUser.uid).collection('docs').doc('data').update({
                                            'bookmark': firebase.firestore.FieldValue.arrayUnion({
                                                'location': location.href.substring(location.origin.length),
                                                'pos': t.offsetTop,
                                                'ttl': t.innerText,
                                                'ts': (new Date).toString()
                                            })
                                        })
                                    }
                                });
                                auth.firestore().collection('users').doc(auth.auth().currentUser.uid).get().then(function (doc) {
                                    $('#login_img').attr('src', doc.data().profile);
                                    $('#login_txt').text(doc.data().id);
                                });
                                var lastSave = Date.now();
                                if(["/signup", "/signin", "/signup.html", "/signin.html", "/", "/index", "/index.html"].indexOf(location.href.substring(location.origin.length)) == -1){
                                save = function (set, f) {
                                    if (Date.now() > (lastSave + 30000) || f === true) {
                                        auth.firestore().collection('users').doc(auth.auth().currentUser.uid).collection('docs').doc('data').update({
                                            'settings': set
                                        });
                                    }
                                    uSet(set);
                                }}else{save = function (e) {
                                    uSet(e);
                                    return true;
                                }}
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
