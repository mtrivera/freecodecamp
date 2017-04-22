'use strict';
var session = document.getElementById('session');
var count = 0;
var minutes = 25;
var seconds = 59;
var interval = setInterval(function () {
    if (count > minutes) {
        clearInterval(interval);
    }
    session.textContent = minutes + ":" + seconds;
    minutes--;
    count += 1;
}, 1000);
