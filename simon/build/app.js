'use strict';
let simon = document.getElementById('simon');
simon.addEventListener('click', playSimon, false);
// Main simon gameplay
function playSimon(e) {
    const WIN = 20;
    let pattern = [];
}
// Get the URL of the soundfile for the matching color
function getSoundURL(soundIndex) {
    return `https://s3.amazonaws.com/freecodecamp/simonSound${soundIndex}.mp3`;
}
// Get a random integer between 1 and 4
function getRandomInt() {
    const min = Math.ceil(1);
    const max = Math.floor(5);
    return Math.floor(Math.random() * (max - min)) + min;
}
