'use strict';

const simon = {
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
  changeColor: (colorBtn) => {
    if (typeof(color) == 'string') {
      colorBtn = document.querySelector(`.${color}`);
    }
   if (colorBtn.style.backgroundColor === colorStyles[colorBtn.className].standard) {
     colorBtn.style.backgroundColor = colorStyles[colorBtn.className].blink;
   } else {
     colorBtn.style.backgroundColor = colorStyles[colorBtn.className].standard;
   }
  },
  nextSequence: () => {
    const nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
    simon.sequence.push(nextColor);
    console.log(`The sequence ${simon.sequence}`);
  },
  playSequence: (sequence, index = -1) => {
    if (index === sequence.length - 1) {  
      return; 
    } else {  
      setTimeout(() => {  
          console.log(`play ${index} ${sequence[index]} at ${new Date().toLocaleString()}`);  
      }, 2000 * (index + 1) );  
      playSequence(sequence, ++index);  
    }  
  },
  playSound: (color) => {
    const audio = document.createElement('audio');
    //audio.src = url;
    audio.src = simon.sounds[color];
    // When sound ends, will change to default color
    audio.onended = function() {
      //simon.changeColor(color);
      console.log('Change color after sound');
    }
    audio.play();
  },
  sendColor: (color) => {
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
    console.log(`NEW COLOR ${color}`);
  }
};

const colorStyles = {
  green: {standard: '#00924a', blink: '#649d81'},
  red: {standard: '#9f201a', blink: '#9c7371'},
  yellow: {standard: '#cfa20d', blink: '#d5c797'},
  blue: {standard: '#054894', blink: '#6a819a'},
};
//const colorsArr = ['green', 'red', 'yellow', 'blue'];
//const gamePattern = ['red', 'green', 'blue'];
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
//let testPattern = generatePattern();

// TODO: Put these two into part of an init function
scoreMsg.textContent = '--';
strictMsg.textContent = 'strict mode disabled'.toUpperCase();

// Listen for colors being clicked
colorsDiv.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON') {
    if (e.target == greenBtn) {
      //console.log('Green button pressed');
      simon.sendColor(greenBtn.className);
      simon.playSound(greenBtn.className);
    }
    if (e.target == redBtn) {
      //console.log('Red button pressed');
      simon.sendColor(redBtn.className);
      simon.playSound(redBtn.className);
    }
    if (e.target == yellowBtn) {
      //console.log('Yellow button pressed');
      simon.sendColor(yellowBtn.className);
      simon.playSound(yellowBtn.className);
    }
    if (e.target == blueBtn) {
      //console.log('Blue button pressed');
      simon.sendColor(blueBtn.className);
      simon.playSound(blueBtn.className);
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