'use strict';
let simon = document.getElementById('simon');
simon.addEventListener('click', playSimon, false);
// Main simon gameplay
function playSimon(e) {
    const WIN = 20;
    let pattern = [];
    let gamePattern = {};
    let playerPattern = {};
    let color = undefined;
    let controls = {
        start: false,
        strict: false
    };
    isStart(controls);
    color = getRandomColor(getRandomInt());
}
// Play the sound of the passed URL
function playSound(url) {
    const audio = new Audio(url);
    audio.play;
}
// Get the URL of the soundfile for the matching color
function getSoundURL(soundIndex) {
    return `https://s3.amazonaws.com/freecodecamp/simonSound${soundIndex}.mp3`;
}
// Get a random color string
function getRandomColor(index) {
    var Color;
    (function (Color) {
        Color[Color["green"] = 0] = "green";
        Color[Color["red"] = 1] = "red";
        Color[Color["yellow"] = 2] = "yellow";
        Color[Color["blue"] = 3] = "blue";
    })(Color || (Color = {}));
    ;
    return Color[index];
}
// Get the standard color for the selected color
function standardColor(color) {
    const standard = {
        'green': '#00924A',
        'red': '#9F201A',
        'yellow': '#CFA20D',
        'blue': '#054894'
    };
    return standard[color];
}
// Get the color to highlight the selected color
function blinkColor(color) {
    const blink = {
        'green': '#649d81',
        'red': '#9c7371',
        'yellow': '#d5c797',
        'blue': '#6a819a'
    };
    return blink[color];
}
// Get a random integer between 1 and 4
function getRandomInt() {
    const min = Math.ceil(0);
    const max = Math.floor(4);
    return Math.floor(Math.random() * (max - min)) + min;
}
// Check if the start button has been pressed; if so, start the game
function isStart(control) {
    if (control.start) {
        return true;
    }
    else {
        return false;
    }
}
// Prompt user to play the game every 30 seconds, disable after 2.5 minutes
function promptUser() {
    const delay = 30000; // 30s
    let timer = setInterval(alertUser, delay);
    return timer;
}
// Message to user about playing the game
function alertUser() {
    alert(`Please turn power ON and click START to play`);
}
// Create new array without mutating
function createArr(arr) {
    return arr.slice(0);
}
// Display text for three buttons: start, reset, and strict
(function displayButtons() {
    const ctrlBtn = document.getElementsByClassName('ctrlBtn');
    ctrlBtn[0].textContent = 'start';
    ctrlBtn[1].textContent = 'reset';
    ctrlBtn[2].textContent = 'strict';
}());
