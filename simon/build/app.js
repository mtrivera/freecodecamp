'use strict';

var colorsDiv = document.getElementById('colors');
// [button.green, button.red, button.yellow, button.blue] 
var colorsList = colorsDiv.children;
var greenBtn = document.querySelector('.green');
var blueBtn = document.querySelector('.blue');
var redBtn = document.querySelector('.red');
var yellowBtn = document.querySelector('.yellow');
var startBtn = document.querySelector('.start');
var resetBtn = document.querySelector('.reset');
var strictBtn = document.querySelector('.strict');
var scoreMsg = document.getElementsByTagName('span')[0];
var strictMsg = document.getElementsByTagName('span')[1];