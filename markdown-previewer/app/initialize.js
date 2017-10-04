'use strict';

import Vue from 'vue';
const marked = require('marked');

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
  }/*,
  methods: {
    convertToMarkdown: function() {
      marked(this.mdInput)
    }
  }*/
})

console.log(marked('I am using __markdown__.'));