var auth;
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
                    auth.auth().onAuthStateChanged(function(user) {
                        if (user) {
                            //if(location.href) location.href = "https://kkotbot-docs.kro.kr";
                        }
                    });
                });
            });
        });
    });
});
