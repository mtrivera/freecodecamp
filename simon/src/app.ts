'use strict';

interface StandardColorConfig {
  readonly green: string;
  readonly red: string;
  readonly yellow: string;
  readonly blue: string;
}

interface BlinkColorConfig extends StandardColorConfig {}

interface PatternConfig {
  [propName: string]: PatternArray;
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
  let controls:ControlsConfig = {
    start: false,
    strict: false
  };
  isStart(controls);
  color = getRandomColor(getRandomInt());
}

// Play the sound of the passed URL
function playSound(url: string): void {
  const audio = new Audio(url);
  audio.play;
}
// Get the URL of the soundfile for the matching color
function getSoundURL(soundIndex: number) {
  return `https://s3.amazonaws.com/freecodecamp/simonSound${soundIndex}.mp3`;
}
// Get a random color string
function getRandomColor(index: number) {
  enum Color { green, red, yellow, blue };
  return Color[index];
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
  const min = Math.ceil(0);
  const max = Math.floor(4);
  return Math.floor(Math.random() * (max - min)) + min;
}
// Check if the start button has been pressed; if so, start the game
function isStart(control: ControlsConfig) {
  if (control.start) {
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
(function displayButtons(): void {
  const ctrlBtn = document.getElementsByClassName('ctrlBtn');
  ctrlBtn[0].textContent = 'start';
  ctrlBtn[1].textContent = 'reset';
  ctrlBtn[2].textContent = 'strict';
}());
