'use strict';

let session:any = document.getElementById('session');
let count:number = 0;
let minutes:number = 25;
let seconds:number = 59;
let interval = setInterval(function() {
  if (count > minutes) {
    clearInterval(interval);
  }
  session.textContent = `${minutes}:${seconds}`;
  minutes--;
  count += 1;
}, 1000);
