'use strict';

interface StandardColorConfig {
  readonly green: string;
  readonly red: string;
  readonly yellow: string;
  readonly blue: string;
}

interface BlinkColorConfig extends StandardColorConfig {}

interface PatternConfig {
  [propName: number]: PatternArray;
}
// Indexable Type
interface PatternArray {
  [index: number]: string;
}

interface ControlsConfig {
  start: boolean;
  strict: boolean;
}

let simon = document.getElementById('simon');
let start = document.getElementById('start');
(simon as any).addEventListener('click', playSimon, false);
//(start as any).addEventListener('click', startGame, false);

// If the user plays start, play the pattern
/*function startGame(e: any) {
  console.log(generatePattern());
}*/

// Main simon gameplay
function playSimon(e: any) {
  const WIN = 20;
  //let pattern:PatternArray = [];
  let gamePattern:PatternConfig = {};
  //let playerPattern:PatternConfig = {};
  let color = undefined;
  let count = 0;

  if (e.target.id == 'start') {
    gamePattern = generatePattern();
    toggleBtn(start);
  }

  if (count == WIN) {
    alert(`Congratulations\nYou Win!`);
    return;
  }
  /*let controls:ControlsConfig = {
    start: false,
    strict: false
  };*/
  //color = getRandomColor(getRandomInt());
  /*const cheese = ["yellow", "green", "green", "yellow", "green", "green", "red", "blue", "blue",
   "yellow", "blue", "red", "blue", "green", "yellow", "green", "yellow", "red", "red", "yellow"];
   playbackPattern(cheese, count, e);*/
  /*
  if (e.target.id == 'green') {
    changeColor(e, blinkColor('green'));
    playSound(e, getSoundURL(1), 'green', count);
  } else if (e.target.id == 'red') {
    changeColor(e, blinkColor('red'));
    playSound(e, getSoundURL(2), 'red', count);
  } else if (e.target.id == 'yellow') {
    changeColor(e, blinkColor('yellow'));
    playSound(e, getSoundURL(3), 'yellow', count);
  } else if (e.target.id == 'blue') {
    changeColor(e, blinkColor('blue'));
    playSound(e, getSoundURL(4), 'blue', count);
  }*/
}
// This will create a random pattern that the player must play back correctly
function generatePattern() {
  const RADIX = 10;
  let pattern: PatternConfig = {};
  let colors: string[] = [];
  for (let count = 1; count <= 20; count += 1) {
    //pattern[count.toString(RADIX)] = getRandomColor(getRandomInt());
    pattern[count.toString(RADIX)] = colors.push(getRandomColor(getRandomInt()));
    pattern[count.toString(RADIX)] = createArr(colors);
  }
  return pattern;
}

// Use for verifying color array, use with every method
/*
const user = ['red', 'green', 'blue']; 
const game = ['red', 'green', 'blue']; 

user.every(isValidPattern);

function isValidPattern(element: string, index: number, array: string[]) {  
  return element == game[index]; 
} 
*/
// Play the the color and corresponding sound
function playColor(color: string, count: number): void  {
  const colorElm = document.getElementById(color);
  (colorElm as HTMLElement).style.backgroundColor = blinkColor(color);
  playSound(getSoundURL(getColorIndex(color)), color, count);
}
// TODO: Only plays one element in the array correctly
function playPattern(arr: string[], count: number): void {
  /*arr.forEach(function(elm) {
    changeColor(elm);
  });*/
}
/*
function validUserInput(userArr: string[], gameArr: string[], strict: boolean) { 
  gameArr.forEach(function(elm, index) {
    if (strcmp(userArr[index], gameArr[index]) == 1) {
      console.log('Match Found!');
    } else {
      if (strict) {
        //toggleBtn(start);
        console.log('Strict Mode Enabled');
        console.log('Game Reset');
        return;
      }
      console.log('Error! Try Again');
      playNext(gameArr);
    }
  });
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
function playbackPattern(arr: string[], count: number, e: any) {
  arr.forEach(function(elm) {
    const color = document.getElementById(elm);
    color.style.backgroundColor = blinkColor(elm);
    //playSound(getSoundURL(getRandomColor[elm]), elm, count, e);
  });
}*/
/*
function getDifficulty(count: number) {
  enum Difficulty { normal = 1000, moderate = 800, hard = 600 }
  let speed = 0;
  if (count < 9) {
    speed = Difficulty.normal;
  } else if (count > 10 && count < 14) {
    speed = Difficulty.moderate;
  } else {
    speed = Difficulty.hard;
  }
  return speed;
}*/
//https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/WebAudio_playbackRate_explained
function difficultySpeed(count: number) {
  enum Speed { normal = 1.0, moderate = 1.2, hard = 1.4 };

  if (count < 9) {
    return Speed['normal'];
  } else if (count > 9 && count < 14) {
    return Speed['moderate'];
  } else {
    return Speed['hard'];
  }
}

// Play the sound of the passed URL
function playSound(url: string, color: string, count: number): void {
  const audio = document.createElement('audio');
  audio.src = url;
  //audio.playbackRate = difficultySpeed(count);
  // When sound ends, will change to default color
  audio.onended = function() {
    changeColor(color);
  }
  audio.play();
}
/*
function playSound(url: string, color: string, count: number, e: any): void {
  const audio = document.createElement('audio');
  audio.src = url;
  audio.playbackRate = difficultySpeed(count);
  // When sound ends, will change to default color
  audio.onended = function() {
    changeColor(standardColor(color), e);
  }
  audio.play();
}
*/
// Get the URL of the soundfile for the matching color
function getSoundURL(soundIndex: number) {
  return `https://s3.amazonaws.com/freecodecamp/simonSound${soundIndex}.mp3`;
}
// Get a random color string
function getRandomColor(index: number) {
  enum Color { green = 1, red, yellow, blue };
  return Color[index];
}
// Get a color index. for the getSoundURL function
function getColorIndex(color: string) {
  enum Color { green = 1, red, yellow, blue };
  return Color[color];
}
// Change color of the box
// TODO: Creates inline style on colora, edit so it doesn't do this
function changeColor(color: string): void {
    const colorElm = document.getElementById(color);
    if ((colorElm as HTMLElement).style.backgroundColor === standardColor(color)) {
      (colorElm as HTMLElement).style.backgroundColor = blinkColor(color);
    } else {
      (colorElm as HTMLElement).style.backgroundColor = standardColor(color);
    }
}
// Get the standard color for the selected color
function standardColor(color: string) {
  const standard:StandardColorConfig = {
    'green': '#00924A',
    'red': '#9F201A',
    'yellow': '#CFA20D',
    'blue': '#054894'
  }
  return standard[color];
}
// Get the color to highlight the selected color
function blinkColor(color: string) {
  const blink:BlinkColorConfig = {
    'green': '#649d81',
    'red': '#9c7371',
    'yellow': '#d5c797',
    'blue': '#6a819a'
  }
  return blink[color];
}
// Get a random integer between 1 and 4
function getRandomInt() {
  const min = Math.ceil(1);
  const max = Math.floor(5);
  return Math.floor(Math.random() * (max - min)) + min;
}
// Check if the start button has been pressed; if so, start the game
function isStart(start: boolean) {
  if (start) {
    return true;
  } else {
    return false;
  }
}
// Prompt user to play the game every 30 seconds, disable after 2.5 minutes
function promptUser() {
  const delay = 30000;  // 30s
  let timer = setInterval(alertUser, delay);
  return timer;
}
// Message to user about playing the game
function alertUser(): void {
  alert(`Please turn power ON and click START to play`);
}
// Create new array without mutating
function createArr(arr: string[]) {
  return arr.slice(0);
}
// Compare string equality, 1 means they are equal
function strcmp(str1: string, str2: string) {
  if (str1 < str2) {
    return -1;
  } else if (str1 > str2) {
    return 0;
  } else {
    return 1;
  }
}
// Disables/enables a button element
function toggleBtn(btnElm: any): void {
  if (btnElm.disabled) {
    btnElm.disabled = false;
  } else {
    btnElm.disabled = true;
  }
}
// Recursive function to play array of sounds
// NOTE: -1 value ensures playNext handles passed array at 0 index
function playNext(sounds: string[], index = -1) {  
  if (index === sounds.length - 1) {  
    return; 
  } else {  
    setTimeout(function() {  
        console.log(`play ${index} ${sounds[index]} at ${new Date().toLocaleString()}`);  
    }, 3000 * (index + 1) );  
    playNext(sounds, ++index);  
  }  
} 
// Toggle color buttons 
function toggleColors() {
  const colors = ['red', 'green', 'yellow', 'blue'];
  colors.forEach(function(elm) {
    toggleBtn(document.getElementById(elm));
  });
}
// Display text for three buttons: start, reset, and strict
/*
(function displayButtons(): void {
  const ctrlBtn = document.getElementsByClassName('ctrlBtn');
  ctrlBtn[0].textContent = 'start';
  ctrlBtn[1].textContent = 'reset';
  ctrlBtn[2].textContent = 'strict';
}());
*/
