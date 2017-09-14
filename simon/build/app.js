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
    blue: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
  },
  step: 0,
  strictMode: false,
  startGame: false,
  WIN: 20,
  // TOFIX: Does not change color properly
  changeColor: function changeColor(colorBtn) {
    if (simon.isBlinkClass(colorBtn.className)) {
      colorBtn.className = 'standard-' + colorBtn.id;
      //console.log(`Change to ${color}`);
    } else {
      colorBtn.className = 'blink-' + colorBtn.id;
      //console.log(`Change to ${color}`);
    }
    /*const color = colorBtn.className;
    if (simon.isBlinkClass(color)) {
      colorBtn.className = color.slice('blink-'.length);
      console.log(`Change to ${colorBtn.className}`);
    } else {
      colorBtn.className = `blink-${color}`;
      console.log(`Change to blink-${color}`)
    }*/
    /*if (simon.isBlinkClass(colorBtn.className)) {
      colorBtn.className = colorBtn.className.slice('blink-'.length);
    } else {
      colorBtn.className = `blink-${colorBtn.className}`;
    }*/
    /*
     if (colorBtn.className === `blink-${colorBtn.className}`) {
      colorBtn.setAttribute('class', colorBtn.className);
    } else {
      colorBtn.setAttribute('class', `blink-${colorBtn.className}`);
    }
    },*/
    /*if (colorBtn.style.backgroundColor === colorStyles[colorBtn.id].standard) {
       colorBtn.style.backgroundColor = colorStyles[colorBtn.id].blink;
     } else {
       colorBtn.style.backgroundColor = colorStyles[colorBtn.id].standard;
     }*/
  },
  init: function init() {
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
    var nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
    simon.sequence.push(nextColor);
    console.log('The sequence ' + simon.sequence);
  },
  playSequence: function playSequence(sequence) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

    if (index === sequence.length - 1) {
      return;
    } else {
      setTimeout(function () {
        if (sequence[index] == greenBtn.id) {
          simon.changeColor(greenBtn);
          simon.playSound(greenBtn);
        } else if (sequence[index] == redBtn.id) {
          simon.changeColor(redBtn);
          simon.playSound(redBtn);
        } else if (sequence[index] == yellowBtn.id) {
          simon.changeColor(yellowBtn);
          simon.playSound(yellowBtn);
        } else if (sequence[index] == blueBtn.id) {
          simon.changeColor(blueBtn);
          simon.playSound(blueBtn);
        }
        console.log('play ' + index + ' ' + sequence[index] + ' at ' + new Date().toLocaleString());
      }, 1000 * (index + 1));
      simon.playSequence(sequence, ++index);
    }
  },
  playSound: function playSound(colorBtn) {
    var audio = document.createElement('audio');
    //audio.src = url;
    audio.src = simon.sounds[colorBtn.id];
    // When sound ends, will change to default color
    audio.onended = function () {
      simon.changeColor(colorBtn);
      console.log('Change color after sound');
    };
    audio.play();
  },
  sendColor: function sendColor(color) {
    if (!simon.sequence.length) {
      // Start game  
      simon.nextSequence();
    } else {
      if (color === simon.sequence[simon.step]) {
        // Go to next step
        if (simon.step == simon.sequence.length - 1) {
          console.log('sequence complete');
          simon.step = 0;
          simon.nextSequence();
        } else {
          simon.step += 1;
        }
      } else {
        // Lose condition
        // TODO: Add if/else for strict mode
        alert('WRONG!');
        simon.sequence = [];
        simon.step = 0;
      }
    }
    console.log('NEW COLOR ' + color);
  }
};
/*const colorStyles = {
  green: {standard: '#00924a', blink: '#649d81'},
  red: {standard: '#9f201a', blink: '#9c7371'},
  yellow: {standard: '#cfa20d', blink: '#d5c797'},
  blue: {standard: '#054894', blink: '#6a819a'},
};*/
//const colorsArr = ['green', 'red', 'yellow', 'blue'];
//const gamePattern = ['red', 'green', 'blue'];
var colorsDiv = document.getElementById('colors');
var controlsDiv = document.getElementById('controls');
// [button.green, button.red, button.yellow, button.blue] 
var colorsList = colorsDiv.children;
var controlsList = controlsDiv.children;
var greenBtn = document.getElementById('green');
var blueBtn = document.getElementById('blue');
var redBtn = document.getElementById('red');
var yellowBtn = document.getElementById('yellow');
/*const greenBtn = document.querySelector('.green');
const blueBtn = document.querySelector('.blue');
const redBtn = document.querySelector('.red');
const yellowBtn = document.querySelector('.yellow');*/
var startBtn = document.querySelector('.start');
var resetBtn = document.querySelector('.reset');
var strictBtn = document.querySelector('.strict');
var scoreMsg = document.getElementsByTagName('span')[0];
var strictMsg = document.getElementsByTagName('span')[1];
//let testPattern = generatePattern();

simon.init();

// Listen for colors being clicked
colorsDiv.addEventListener('click', function (e) {
  if (e.target.tagName == 'BUTTON') {
    if (e.target == greenBtn) {
      console.log('Green button pressed');
      //simon.sendColor(greenBtn.id);
      simon.changeColor(greenBtn);
      simon.playSound(greenBtn);
      //simon.changeColor(greenBtn);
    }
    if (e.target == redBtn) {
      console.log('Red button pressed');
      //simon.sendColor(redBtn.id);
      simon.changeColor(redBtn);
      simon.playSound(redBtn);
    }
    if (e.target == yellowBtn) {
      console.log('Yellow button pressed');
      //simon.sendColor(yellowBtn.id);
      simon.changeColor(yellowBtn);
      simon.playSound(yellowBtn);
    }
    if (e.target == blueBtn) {
      console.log('Blue button pressed');
      //simon.sendColor(blueBtn.id);
      simon.changeColor(blueBtn);
      simon.playSound(blueBtn);
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
// Get a random integer between 0 and 3
function getRandomInt() {
  const min = 0;
  const max = 4;
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
*/
// Recursive function to play array of colors
// NOTE: -1 value ensures playPattern handles passed array at 0 index
/*
function playPattern(colors, index = -1) {
  if (index === colors.length - 1) {  
    return; 
  } else {  
    setTimeout(function() {  
        console.log(`play ${index} ${colors[index]} at ${new Date().toLocaleString()}`);  
    }, 2000 * (index + 1) );  
    playPattern(colors, ++index);  
  }  
}*/
/*
//console.log(colorsArr[getRandomInt()]);
// simon will create a random pattern that the player must play back correctly
function generatePattern() {
  const RADIX = 10;
  let pattern = {};
  let colors = [];
  for (let count = 1; count <= 20; count += 1) {
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
*/
// Disables/enables a button element
function toggleBtn(btn) {
  if (btn.disabled) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}
/*
function validateUserInput(userArr, gameArr) { 
  let count = 0;
  while (count < gameArr.length) {
    if (strcmp(userArr[count], gameArr[count]) == 1) {
      console.log('Match Found!');
      count += 1;
    } else {
      if (strict) {
        //toggleBtn(start);
        console.log('Strict Mode Enabled');
        console.log('Game Reset');
        return;
      }
      console.log('Error! Try Again');
      return;
    }
  }
  console.log('Patterns Match\nPlay next pattern');
}
*/
/*
if (strcmp(userArr[counter.toString()][0], gameArr[counter.toString()][0] == 1)) { 
  console.log(`User: ${userArr[counter]} Test: ${gameArr[counter]}`); 
  console.log('Match Found!'); 
  counter += 1; 
} else { 
  if (strict) { 
    gamePattern = generatePattern(); 
    toggleBtn(start); 
  } 
  console.log('Error!'); 
  playNext(gameArr[counter.toString()]); 
} 
*/
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