'use strict';

var colorStyles = {
  green: { standard: '#00924a', blink: '#649d81' },
  red: { standard: '#9f201a', blink: '#9c7371' },
  yellow: { standard: '#cfa20d', blink: '#d5c797' },
  blue: { standard: '#054894', blink: '#6a819a' }
};
var colorsArr = ['green', 'red', 'yellow', 'blue'];
var gamePattern = ['red', 'green', 'blue'];
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
var userPattern = [];
var playerTurn = false;
//let testPattern = generatePattern();


// TODO: Put these two into part of an init function
scoreMsg.textContent = '--';
strictMsg.textContent = 'strict mode disabled'.toUpperCase();

// Listen for colors being clicked
colorsDiv.addEventListener('click', function (e) {
  if (e.target.tagName == 'BUTTON') {
    if (e.target == greenBtn) {
      console.log('Green button pressed');
      //userPattern.push(e.target.className);
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
// Get a random integer between 0 and 3
function getRandomInt() {
  var min = 0;
  var max = 4;
  return Math.floor(Math.random() * (max - min)) + min;
}
// Compare string equality, 1 means equality
function strcmp(str1, str2) {
  if (str1 < str2) {
    return -1;
  } else if (str1 > str2) {
    return 0;
  } else {
    return 1;
  }
}
// Recursive function to play array of colors
// NOTE: -1 value ensures playPattern handles passed array at 0 index
function playPattern(colors) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

  if (index === colors.length - 1) {
    return;
  } else {
    setTimeout(function () {
      console.log('play ' + index + ' ' + colors[index] + ' at ' + new Date().toLocaleString());
    }, 2000 * (index + 1));
    playPattern(colors, ++index);
  }
}
//console.log(colorsArr[getRandomInt()]);
// This will create a random pattern that the player must play back correctly
function generatePattern() {
  var RADIX = 10;
  var pattern = {};
  var colors = [];
  for (var count = 1; count <= 20; count += 1) {
    //pattern[count.toString(RADIX)] = getRandomColor(getRandomInt());
    pattern[count.toString(RADIX)] = colors.push(colorsArr[getRandomInt()]);
    pattern[count.toString(RADIX)] = createArr(colors);
  }
  return pattern;
}
// Create an array without mutation
function createArr(arr) {
  return arr.slice(0);
}
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