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
(simon as any).addEventListener('click', playSimon, false);

// Main simon gameplay
function playSimon(e: any) {
  const WIN = 20;
  let pattern:PatternArray = [];
  let gamePattern:PatternConfig = {};
  let playerPattern:PatternConfig = {};
  let color = undefined;
  let count = 0;
  /*let controls:ControlsConfig = {
    start: false,
    strict: false
  };*/
  //color = getRandomColor(getRandomInt());
  color = 'green';
  if (color == 'green') {
    changeColor(e, blinkColor('green'));
    playSound(e, getSoundURL(1), 'green', count);
  } else if (color == 'red') {
    changeColor(e, blinkColor('red'));
    playSound(e, getSoundURL(2), 'red', count);
  } else if (color == 'yellow') {
    changeColor(e, blinkColor('yellow'));
    playSound(e, getSoundURL(3), 'yellow', count);
  } else if (color == 'blue') {
    changeColor(e, blinkColor('blue'));
    playSound(e, getSoundURL(4), 'blue', count);
  }
}
// This will create a random pattern that the player must play back correctly
function generatePattern() {
  let pattern: PatternConfig = {};
  let colors: string[] = [];
  for (let count = 1; count <= 20; count += 1) {
      pattern[count.toString()] = colors.push(getRandomColor(getRandomInt()));
      pattern[count.toString()] = createArr(colors);
  }
  return pattern;
}

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
}
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
function playSound(e: any, url: string, color: string, count: number): void {
  const audio = new Audio(url);
  audio.playbackRate = difficultySpeed(count);
  audio.play();
}
/*
function isSound(e: any, audio: any, color: string) {
  if (audio.ended) {
    changeColor(e, standardColor(color));
  }
}*/
// Get the URL of the soundfile for the matching color
function getSoundURL(soundIndex: number) {
  return `https://s3.amazonaws.com/freecodecamp/simonSound${soundIndex}.mp3`;
}
// Get a random color string
function getRandomColor(index: number) {
  enum Color { green = 1, red, yellow, blue };
  return Color[index];
}
// Change color of the box
function changeColor(e: any, color: string): void {
  e.target.style.backgroundColor = color;
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
// Display text for three buttons: start, reset, and strict
/*
(function displayButtons(): void {
  const ctrlBtn = document.getElementsByClassName('ctrlBtn');
  ctrlBtn[0].textContent = 'start';
  ctrlBtn[1].textContent = 'reset';
  ctrlBtn[2].textContent = 'strict';
}());
*/
