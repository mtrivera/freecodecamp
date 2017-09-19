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
    blue: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
    error: 'https://raw.githubusercontent.com/mtrivera/freecodecamp/master/simon/8-bit-error.mp3'
  },
  score: 0,
  step: 0,
  strictMode: false,
  startGame: false,
  WIN: 20,
  changeColor: (colorBtn) => {
    if (simon.isBlinkClass(colorBtn.className)) {
     colorBtn.className = `standard-${colorBtn.id}`;
     console.log(`Change to ${colorBtn.className}`);
    } else {
     colorBtn.className = `blink-${colorBtn.id}`;
     console.log(`Change to ${colorBtn.className}`);
    }
  },
  getSpeed: (score) => { 
    if (score > 15) { 
      return simon.speed.hard; 
    } else if (score > 8 && score < 14) { 
      return simon.speed.moderate; 
    } else { 
      return simon.speed.normal; 
    } 
  }, 
  init: () => {
    simon.score = 0;
    simon.sequence = [];
    simon.step = 0;
    // Set default colors for the buttons
    greenBtn.className = `standard-${greenBtn.id}`;
    redBtn.className = `standard-${redBtn.id}`;
    yellowBtn.className = `standard-${yellowBtn.id}`;
    blueBtn.className = `standard-${blueBtn.id}`;
    // Set default values for the message boxes
    scoreMsg.textContent = '--';
    strictMsg.textContent = 'strict mode off'.toUpperCase();
  },
  isBlinkClass: (color_class) => {
    return /blink/.test(color_class);
  },
  nextSequence: () => {
    const nextColor = simon.colors[simon.rand()];
    simon.sequence.push(nextColor);
    // TODO: After a sequence is complete, the zero-index element plays immediately
    // But there should be a delay
    simon.playSequence(simon.sequence);
    console.log(`The sequence ${simon.sequence}`);
  },
  playSequence: (sequence, index = -1) => {
    if (index === sequence.length - 1) {  
      return; 
    } else {  
      // This solved the playback issue
      simon.playSequence(sequence, ++index);
      setTimeout(() => {  
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
          console.log(`play ${index} ${sequence[index]} at ${new Date().toLocaleString()}`);  
      }, simon.getSpeed(simon.score) * (index + 1) );  
      //simon.playSequence(sequence, ++index);  
    }  
  },
  playSound: (colorBtn) => {
    const audio = document.createElement('audio');
    //audio.src = url;
    audio.src = simon.sounds[colorBtn.id];
    // When sound ends, will change to default color
    audio.onended = () => {
      simon.changeColor(colorBtn);
      console.log('Change color after sound');
    }
    audio.play();
  },
  rand: () => {
    return Math.floor(Math.random() * simon.colors.length);
  },
  renderScore: (score)=> {
    if (score < 10) {
      scoreMsg.textContent = `0${score}`;
    } else {
      scoreMsg.textContent = score;
    }
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
          ++simon.score;
          simon.renderScore(simon.score);
          simon.nextSequence();
        } else {
          simon.step += 1;
        }
      } else {
        // Lose condition
        if (simon.strictMode) {
          simon.init();
          simon.sendColor(simon.colors[simon.rand()]);
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
/*const colorStyles = {
  green: {standard: '#00924a', blink: '#649d81'},
  red: {standard: '#9f201a', blink: '#9c7371'},
  yellow: {standard: '#cfa20d', blink: '#d5c797'},
  blue: {standard: '#054894', blink: '#6a819a'},
};*/
//const colorsArr = ['green', 'red', 'yellow', 'blue'];
//const gamePattern = ['red', 'green', 'blue'];
const colorsDiv = document.getElementById('colors');
const controlsDiv = document.getElementById('controls');
// [button.green, button.red, button.yellow, button.blue] 
const colorsList = colorsDiv.children;
const controlsList = controlsDiv.children;
const greenBtn = document.getElementById('green');
const blueBtn = document.getElementById('blue');
const redBtn = document.getElementById('red');
const yellowBtn = document.getElementById('yellow');
/*const greenBtn = document.querySelector('.green');
const blueBtn = document.querySelector('.blue');
const redBtn = document.querySelector('.red');
const yellowBtn = document.querySelector('.yellow');*/
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const strictBtn = document.querySelector('.strict');
const scoreMsg = document.getElementsByTagName('span')[0];
const strictMsg = document.getElementsByTagName('span')[1];
//let testPattern = generatePattern();

simon.init();

// Listen for colors being clicked
colorsDiv.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON') {
    if (e.target == greenBtn) {
      console.log('Green button pressed');
      simon.sendColor(greenBtn.id);
      simon.changeColor(greenBtn);
      simon.playSound(greenBtn);
    }
    if (e.target == redBtn) {
      console.log('Red button pressed');
      simon.sendColor(redBtn.id);
      simon.changeColor(redBtn);
      simon.playSound(redBtn);
    }
    if (e.target == yellowBtn) {
      console.log('Yellow button pressed');
      simon.sendColor(yellowBtn.id);
      simon.changeColor(yellowBtn);
      simon.playSound(yellowBtn);
    }
    if (e.target == blueBtn) {
      console.log('Blue button pressed');
      simon.sendColor(blueBtn.id);
      simon.changeColor(blueBtn);
      simon.playSound(blueBtn);
    }
  }
});

// Listen for control buttons being clicked
controlsDiv.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON') {
    if (e.target == startBtn) {
      simon.sendColor(simon.colors[simon.rand()]);
      //simon.playSequence(simon.sequence);
      //console.log('Start button pressed\nGame On!');
    }
    if (e.target == resetBtn) {
      simon.init();
      console.log('Reset button pressed\nReset the game!');
    }
    if (e.target == strictBtn) {
      simon.strictMode = true;
      strictMsg.textContent = 'strict mode on'.toUpperCase();
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