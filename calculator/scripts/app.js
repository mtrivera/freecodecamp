'use strict';

function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function getInputData() {
    var vals = [];
    var equation = document.getElementById('equation');
    var form = document.getElementById('calculator');
    form.addEventListener('click', function calculate(e) {
    // e.target is the clicked element!!
    // Event delegation
      if (e.target && e.target.nodeName === 'INPUT') {
    // List the button name and its value
        //console.log(`Button ${e.target.id} was clicked! Value: ${e.target.value}`);
        // TODO: Use switch statement
          if (e.target.value === 'AC') {
            equation.value = '';
            vals = [];
          } else if (e.target.value === 'DEL') {
            vals.pop();
            equation.value = vals.join('');
          } else if (e.target.value === '÷') {
            equation.value += '/';
            vals.push('/');
          } else if (e.target.value === '×') {
            equation.value += '*';
            vals.push('*');
          } else if (e.target.value !== '=') {
            equation.value += e.target.value;
            vals.push(e.target.value);
          } else {
            equation.value = eval(equation.value);
          }
      }
    });
}

ready(getInputData);
