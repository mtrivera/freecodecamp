'use strict';

import Vue from 'vue';
const marked = require('marked');

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

document.addEventListener('DOMContentLoaded', function() {
  // do your setup here
  console.log('Initialized app');
});

const mdapp = new Vue({
  el: '#app',
  data: {
    mdInput: ''
  },
  computed: {
    compileToMarkdown: function() {
      return marked(this.mdInput)
    }  
  },
  methods: {
    update: debounce(function(e) {
      this.input = e.target.value
    }, 300)
  }
})
//console.log(marked('I am using __markdown__.'));