'use strict';

const colorsDiv = document.getElementById('colors'); 
// [button.green, button.red, button.yellow, button.blue] 
const colorsList = colorsDiv.children;  
const greenBtn = document.querySelector('.green'); 
const blueBtn = document.querySelector('.blue'); 
const redBtn = document.querySelector('.red'); 
const yellowBtn = document.querySelector('.yellow'); 
const startBtn = document.querySelector('.start'); 
const resetBtn = document.querySelector('.reset'); 
const strictBtn = document.querySelector('.strict'); 
const scoreMsg = document.getElementsByTagName('span')[0]; 
const strictMsg = document.getElementsByTagName('span')[1];