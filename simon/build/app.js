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
    let count = 0;
    /*let controls:ControlsConfig = {
      start: false,
      strict: false
    };*/
    //color = getRandomColor(getRandomInt());
    if (e.target.id == 'green') {
        changeColor(e, blinkColor('green'));
        playSound(e, getSoundURL(1), 'green', count);
    }
    else if (e.target.id == 'red') {
        changeColor(e, blinkColor('red'));
        playSound(e, getSoundURL(2), 'red', count);
    }
    else if (e.target.id == 'yellow') {
        changeColor(e, blinkColor('yellow'));
        playSound(e, getSoundURL(3), 'yellow', count);
    }
    else if (e.target.id == 'blue') {
        changeColor(e, blinkColor('blue'));
        playSound(e, getSoundURL(4), 'blue', count);
    }
}
// This will create a random pattern that the player must play back correctly
function generatePattern() {
    const RADIX = 10;
    let pattern = {};
    let colors = [];
    for (let count = 1; count <= 20; count += 1) {
        pattern[count.toString(RADIX)] = colors.push(getRandomColor(getRandomInt()));
        pattern[count.toString(RADIX)] = createArr(colors);
    }
    return pattern;
}
function getDifficulty(count) {
    var Difficulty;
    (function (Difficulty) {
        Difficulty[Difficulty["normal"] = 1000] = "normal";
        Difficulty[Difficulty["moderate"] = 800] = "moderate";
        Difficulty[Difficulty["hard"] = 600] = "hard";
    })(Difficulty || (Difficulty = {}));
    let speed = 0;
    if (count < 9) {
        speed = Difficulty.normal;
    }
    else if (count > 10 && count < 14) {
        speed = Difficulty.moderate;
    }
    else {
        speed = Difficulty.hard;
    }
    return speed;
}
//https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/WebAudio_playbackRate_explained
function difficultySpeed(count) {
    var Speed;
    (function (Speed) {
        Speed[Speed["normal"] = 1] = "normal";
        Speed[Speed["moderate"] = 1.2] = "moderate";
        Speed[Speed["hard"] = 1.4] = "hard";
    })(Speed || (Speed = {}));
    ;
    if (count < 9) {
        return Speed['normal'];
    }
    else if (count > 9 && count < 14) {
        return Speed['moderate'];
    }
    else {
        return Speed['hard'];
    }
}
// Play the sound of the passed URL
function playSound(e, url, color, count) {
    const audio = document.createElement('audio');
    audio.src = url;
    audio.playbackRate = difficultySpeed(count);
    // When sound ends, will change to default color
    audio.onended = function () {
        changeColor(e, standardColor(color));
    };
    audio.play();
}
// Get the URL of the soundfile for the matching color
function getSoundURL(soundIndex) {
    return `https://s3.amazonaws.com/freecodecamp/simonSound${soundIndex}.mp3`;
}
// Get a random color string
function getRandomColor(index) {
    var Color;
    (function (Color) {
        Color[Color["green"] = 1] = "green";
        Color[Color["red"] = 2] = "red";
        Color[Color["yellow"] = 3] = "yellow";
        Color[Color["blue"] = 4] = "blue";
    })(Color || (Color = {}));
    ;
    return Color[index];
}
// Change color of the box
// TODO: Creates inline style on colora, edit so it doesn't do this
function changeColor(e, color) {
    e.target.style.backgroundColor = color;
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
    const min = Math.ceil(1);
    const max = Math.floor(5);
    return Math.floor(Math.random() * (max - min)) + min;
}
// Check if the start button has been pressed; if so, start the game
function isStart(start) {
    if (start) {
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
