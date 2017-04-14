'use strict';

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function calculate() {
  var vals = [];  // Needed to make DEL button work properly
  var equation = document.getElementById('equation');
  document.getElementById('calculator').addEventListener('click', function getInputData(e) {
    if (e.target && e.target.nodeName === 'INPUT') {
      switch (e.target.value) {
        case 'AC': equation.value = '';
                   vals = [];
                   break;
        case 'DEL': vals.pop();   // Current item is deleted
                    // Remaining strings are joined and equation.value is set to it
                    equation.value = vals.join('');
                    break;
        case '÷': equation.value += '/';
                  vals.push('/');
                  break;
        case '×': equation.value += '*';
                  vals.push('*');
                  break;
        case '=': equation.value = eval(equation.value);
                  break;
        default: equation.value += e.target.value;
                 vals.push(e.target.value);
                 break;
        }
      }
  });
}

ready(calculate);
