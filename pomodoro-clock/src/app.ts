'use strict';

// TODO: Remove global variables
let running:boolean = false;
let start:any = document.getElementById('startBtn');
let session:any = document.getElementById('session');
let clock:any = document.getElementById('clock');
let minutes:number = 25;
let seconds:number = 0;
let zeroSet:string = '00';
let interval:any;

clock.addEventListener('click', function(e) {
  if (e.target && e.target.nodeName === 'BUTTON') {
    switch (e.target.id) {
      case 'startBtn':
        if (start.textContent === 'RESUME') {
          start.textContent = 'START';
        }
        running = true;
        interval = setInterval(countdown, 1000);
        break;
      case 'pauseBtn':
        if (running) {
          clearInterval(interval);
        }
        start.textContent = 'RESUME';
        break;
      case 'moreTimeBtn':
        minutes += 1;
        break;
      case 'lessTimeBtn':
        if (minutes > 0) {
          minutes -= 1;
        }
        break;
    }
  }
});

function countdown() {
  stopClock(minutes);

  if (seconds < 0) {
    setClock(minutes);
  }

  session.textContent = `${minutes}:${seconds}`;
  appendZero(minutes, seconds);
/*
  appendMinuteZero(minutes);
  appendSecondZero(seconds);
*/
  if (seconds > 0 ) {
    seconds -= 1;
  } else {
    seconds = 59;
    minutes -= 1;
  }

  if (minutes < 0) {
    zeroClock(minutes, seconds);
  }
}

function zeroClock(minutes: number, seconds: number) {
  return `${zeroSet}:${zeroSet}`;
}

function setClock(minutes: number) {
  return `${minutes}:${zeroSet}`;
}

function stopClock(minutes: number) {
  // Session is over, stop timer
  if (minutes < 0) {
    clearInterval(interval);
  }
}
// TODO: If the minute is < 10, the zero is not appended correctly for seconds
function appendZero(minutes: number, seconds: number) {
  if (minutes < 10 ) {
    // Append leading zero to minutes < 10
    session.textContent =  `0${minutes}:${seconds}`;
  } else if (seconds < 10) {
    // Append leading zero to minutes < 10
    session.textContent =  `${minutes}:0${seconds}`;
  } else if (seconds < 10 && minutes < 10) {
    session.textContent =  `0${minutes}:0${seconds}`;
  }
}
/*
function appendMinuteZero(minutes: number) {
  if (minutes < 10) {
    // Append leading zero to minutes < 10
    session.textContent = `0${minutes}:${seconds}`;
  }
}

function appendSecondZero(seconds: number) {
  if (seconds < 10) {
    // Append leading zero to minutes < 10
    session.textContent = `${minutes}:0${seconds}`;
  }
}
*/
