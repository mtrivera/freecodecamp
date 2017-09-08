'use strict';

var colorsDiv = document.getElementById('colors');
var controlsDiv = document.getElementById('controls');
// [button.green, button.red, button.yellow, button.blue] 
var colorsList = colorsDiv.children;
var controlsList = controlsDiv.children;
var greenBtn = document.querySelector('.green');
var blueBtn = document.querySelector('.blue');
var redBtn = document.querySelector('.red');
var yellowBtn = document.querySelector('.yellow');
var startBtn = document.querySelector('.start');
var resetBtn = document.querySelector('.reset');
var strictBtn = document.querySelector('.strict');
var scoreMsg = document.getElementsByTagName('span')[0];
var strictMsg = document.getElementsByTagName('span')[1];

// TODO: Put these two into part of an init function
scoreMsg.textContent = '--';
strictMsg.textContent = 'strict mode disabled'.toUpperCase();

// Listen for colors being clicked
colorsDiv.addEventListener('click', function (e) {
  if (e.target.tagName == 'BUTTON') {
    if (e.target == greenBtn) {
      console.log('Green button pressed');
    }
    if (e.target == blueBtn) {
      console.log('Blue button pressed');
    }
    if (e.target == redBtn) {
      console.log('Red button pressed');
    }
    if (e.target == yellowBtn) {
      console.log('Yellow button pressed');
    }
  }
});

// Listen for control buttons being clicked
controlsDiv.addEventListener('click', function (e) {
  if (e.target.tagName == 'BUTTON') {
    if (e.target == startBtn) {
      console.log('Start button pressed\nGame On!');
    }
    if (e.target == resetBtn) {
      console.log('Reset button pressed\nReset the game!');
    }
    if (e.target == strictBtn) {
      console.log('Strict button pressed\nStrict mode enabled');
    }
  }
});
/*
startBtn.addEventListener('click', () => {
  console.log('Start button pressed\nGame On!');
});

resetBtn.addEventListener('click', () => {
  console.log('Reset button pressed\nReset the game!');
});

strictBtn.addEventListener('click', () => {
  console.log('Strict button pressed\nStrict mode enabled');
});*/