'use strict';

var simon = {
  colors: ['green', 'red', 'yellow', 'blue'],
  speed: {
    normal: 2000,
    moderate: 1667,
    hard: 1333
  },
  sequence: [],
  sounds: {
    green: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
    red: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
    yellow: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
    blue: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
    error: 'https://cdn.rawgit.com/mtrivera/freecodecamp/master/simon/8-bit-error.mp3'
  },
  score: 0,
  step: 0,
  strictMode: false,
  WIN: 20,
  changeColor: function changeColor(colorBtn) {
    if (simon.isBlinkClass(colorBtn.className)) {
      colorBtn.className = 'standard-' + colorBtn.id;
      //console.log(`Change to ${colorBtn.className}`);
    } else {
      colorBtn.className = 'blink-' + colorBtn.id;
      //console.log(`Change to ${colorBtn.className}`);
    }
  },
  gameOver: function gameOver(score) {
    if (score == simon.WIN) {
      alert('You Win!');
      toggleBtn(startBtn);
      simon.init();
    }
  },
  getSpeed: function getSpeed(score) {
    if (score > 15) {
      return simon.speed.hard;
    } else if (score > 8 && score < 14) {
      return simon.speed.moderate;
    } else {
      return simon.speed.normal;
    }
  },
  init: function init() {
    simon.score = 0;
    simon.sequence = [];
    simon.step = 0;
    // Set default colors for the buttons
    greenBtn.className = 'standard-' + greenBtn.id;
    redBtn.className = 'standard-' + redBtn.id;
    yellowBtn.className = 'standard-' + yellowBtn.id;
    blueBtn.className = 'standard-' + blueBtn.id;
    // Set default values for the message boxes
    scoreMsg.textContent = '--';
    strictMsg.textContent = 'strict mode off'.toUpperCase();
  },
  isBlinkClass: function isBlinkClass(color_class) {
    return (/blink/.test(color_class)
    );
  },
  nextSequence: function nextSequence() {
    var nextColor = simon.colors[simon.rand()];
    simon.sequence.push(nextColor);
    simon.playSequence(simon.sequence);
    //console.log(`The sequence ${simon.sequence}`);
  },
  playSequence: function playSequence(sequence) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

    if (index === sequence.length - 1) {
      return;
    } else {
      // This solved the playback issue
      simon.playSequence(sequence, ++index);
      setTimeout(function () {
        if (sequence[index] === greenBtn.id) {
          simon.changeColor(greenBtn);
          simon.playSound(greenBtn);
        } else if (sequence[index] === redBtn.id) {
          simon.changeColor(redBtn);
          simon.playSound(redBtn);
        } else if (sequence[index] === yellowBtn.id) {
          simon.changeColor(yellowBtn);
          simon.playSound(yellowBtn);
        } else if (sequence[index] === blueBtn.id) {
          simon.changeColor(blueBtn);
          simon.playSound(blueBtn);
        }
        //console.log(`play ${index} ${sequence[index]} at ${new Date().toLocaleString()}`);  
      }, simon.getSpeed(simon.score) * (index + 1));
      //simon.playSequence(sequence, ++index);  
    }
  },
  playErrorSound: function playErrorSound(errorURL) {
    var audio = document.createElement('audio');
    audio.src = errorURL;
    audio.play();
  },
  playSound: function playSound(colorBtn) {
    var audio = document.createElement('audio');
    //audio.src = url;
    audio.src = simon.sounds[colorBtn.id];
    // When sound ends, will change to default color
    audio.onended = function () {
      simon.changeColor(colorBtn);
      //console.log('Change color after sound');
    };
    audio.play();
  },
  rand: function rand() {
    return Math.floor(Math.random() * simon.colors.length);
  },
  renderScore: function renderScore(score) {
    if (score < 10) {
      scoreMsg.textContent = '0' + score;
    } else {
      scoreMsg.textContent = score;
    }
  },
  renderStrictMsg: function renderStrictMsg(strict) {
    if (simon.strictMode) {
      strictMsg.textContent = 'strict mode on'.toUpperCase();
      //console.log('strict mode on');
    } else {
      strictMsg.textContent = 'strict mode off'.toUpperCase();
      //console.log('strict mode off');
    }
  },
  sendColor: function sendColor(color) {
    if (!simon.sequence.length) {
      // Start game  
      simon.nextSequence();
    } else {
      if (color === simon.sequence[simon.step]) {
        // Go to next step
        if (simon.step === simon.sequence.length - 1) {
          //console.log('sequence complete');
          simon.step = 0;
          ++simon.score;
          simon.renderScore(simon.score);
          simon.gameOver(simon.score);
          simon.nextSequence();
        } else {
          simon.step += 1;
        }
      } else {
        simon.playErrorSound(simon.sounds.error);
        // Lose condition
        if (simon.strictMode) {
          toggleBtn(startBtn);
          simon.init();
          setTimeout(simon.nextSequence(), 3000);
        } else {
          // Clears step for traversing sequence
          simon.step = 0;
          simon.playSequence(simon.sequence);
        }
      }
    }
    //console.log(`NEW COLOR ${color}`);
  }
};
var colorsDiv = document.getElementById('colors');
//const controlsDiv = document.getElementById('controls');
var controlsDiv = document.querySelector('.menu');
var colorsList = colorsDiv.children;
var controlsList = controlsDiv.children;
var greenBtn = document.getElementById('green');
var blueBtn = document.getElementById('blue');
var redBtn = document.getElementById('red');
var yellowBtn = document.getElementById('yellow');
var startBtn = document.querySelector('.menu__start-button');
var resetBtn = document.querySelector('.menu__reset-button');
var strictBtn = document.querySelector('.menu__strict-button');
var scoreMsg = document.getElementsByTagName('span')[0];
var strictMsg = document.getElementsByTagName('span')[1];

simon.init();

// Listen for colors being clicked
colorsDiv.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    if (e.target === greenBtn) {
      //console.log('Green button pressed');
      simon.sendColor(greenBtn.id);
      simon.changeColor(greenBtn);
      simon.playSound(greenBtn);
    }
    if (e.target === redBtn) {
      //console.log('Red button pressed');
      simon.sendColor(redBtn.id);
      simon.changeColor(redBtn);
      simon.playSound(redBtn);
    }
    if (e.target === yellowBtn) {
      //console.log('Yellow button pressed');
      simon.sendColor(yellowBtn.id);
      simon.changeColor(yellowBtn);
      simon.playSound(yellowBtn);
    }
    if (e.target === blueBtn) {
      //console.log('Blue button pressed');
      simon.sendColor(blueBtn.id);
      simon.changeColor(blueBtn);
      simon.playSound(blueBtn);
    }
  }
});

// Listen for control buttons being clicked
controlsDiv.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    if (e.target === startBtn) {
      toggleBtn(startBtn);
      simon.nextSequence();
      //console.log('Start button pressed\nGame On!');
    }
    if (e.target === resetBtn) {
      simon.init();
      //console.log('Reset button pressed\nReset the game!');
    }
    if (e.target === strictBtn) {
      simon.strictMode = !simon.strictMode;
      simon.renderStrictMsg(simon.strictMode);
      //console.log('Strict button pressed');
    }
  }
});

// Disables/enables a button element
function toggleBtn(btn) {
  if (btn.disabled) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}