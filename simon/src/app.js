'use strict';

const colorsDiv = document.getElementById('colors');
const controlsDiv = document.getElementById('controls');
// [button.green, button.red, button.yellow, button.blue] 
const colorsList = colorsDiv.children;
const controlsList = controlsDiv.children;
const greenBtn = document.querySelector('.green');
const blueBtn = document.querySelector('.blue');
const redBtn = document.querySelector('.red');
const yellowBtn = document.querySelector('.yellow');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const strictBtn = document.querySelector('.strict');
const scoreMsg = document.getElementsByTagName('span')[0];
const strictMsg = document.getElementsByTagName('span')[1];

// TODO: Put these two into part of an init function
scoreMsg.textContent = '--';
strictMsg.textContent = 'strict mode disabled'.toUpperCase();

// Listen for colors being clicked
colorsDiv.addEventListener('click', (e) => {
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
controlsDiv.addEventListener('click', (e) => {
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