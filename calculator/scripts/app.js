'use strict';

function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function getInputData() {
    // Event Delegation
    var form = document.getElementById('calculator');
    form.addEventListener('click', function(e) {
    // e.target is the clicked element!!
    // If it was an input button
    if (e.target && e.target.nodeName === 'INPUT') {
    // List the button name and its value
        console.log(`Button ${e.target.id} was clicked! Value: ${e.target.value}`);
    }
  });
}

ready(getInputData);