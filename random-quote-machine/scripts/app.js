/*new quote button and app work :D
http://joelb.me/blog/2012/tutorial-creating-a-custom-tweet-button-with-counter/
https://dev.twitter.com/web/tweet-button/web-intent
todo: 
add css 
error checking for quotes longer than 140 characters 
add toggle for changing quote category? http://www.bootstraptoggle.com/
change magic numbers / strings to variables
*/
// List of ten motivational quotes
// "Motivational Quotes." BrainyQuote.com. Xplore Inc, 2017. 24 October 2017. 
// https://www.brainyquote.com/quotes/topics/topic_motivational.html
/*var quotes = [
  {
    "quote": "Only I can change my life. No one can do it for me.",
    "author": "Carol Burnett"
  },
  {
    "quote": "Life is 10% what happens to you and 90% how you react to it.",
    "author": "Charles R. Swindoll"
  },
  {
    "quote": "It does not matter how slowly you go as long as you do not stop.",
    "author": "Confucius"
  },
  {
    "quote": "The secret of getting ahead is getting started.",
    "author": "Mark Twain"
  },
  {
    "quote": "We may encounter many defeats but we must not be defeated.",
    "author": "Maya Angelou"
  },
  {
    "quote": "Perseverance is failing 19 times and succeeding the 20th.",
    "author": "Julie Andrews"
  },
  {
    "quote": "Well done is better than well said.",
    "author": "Benjamin Franklin"
  },
  {
    "quote": "I can, therefore I am.",
    "author": "Simone Weil"
  },
  {
    "quote": "I am not afraid...I was born to do this.",
    "author": "Joan of Arc"
  },
  {
    "quote": "I know where I'm going and I know the truth, and I don't have to be what you want me to be. I'm free to be what I want.",
    "author": "Muhammad Ali"
  }
];*/
// AJAX GET Request
var jqxhr = $.getJSON('data/quotes.json', function(data) {
  renderQuote(data);
}).fail(function(error) {
  console.log('Error message:' + error);
});
/*$.ajax({
  url: 'data/quotes.json', 
  type: 'GET',
  dataType: 'json',
  success: function(quoteData) {
    console.log(quoteData[3].quote);
  }
});
*/
// Generate a random number
function rand(arr) {
  return Math.floor(Math.random() * arr.length);
}
// Get quote content
function getQuote(quotesArr, index) {
  return quotesArr[index].quote;
}
// Get quote author
function getAuthor(quotesArr, index) {
  return quotesArr[index].author;
}
// Render the quote and call tweet function
function renderQuote(quotesArr) {
  var index = rand(quotesArr);
  $('div.quote-content').empty().append(getQuote(quotesArr, index) + '<br />');
  $('cite.quote-author').empty().append('-' + getAuthor(quotesArr, index));
  buildTweetQuote(getQuote(quotesArr, index), getAuthor(quotesArr, index));
}
// Prepare quote and author content for Tweet button
function buildTweetQuote(quote, author) {
  $('.tweet').attr('href','https://twitter.com/intent/tweet?text=' + '"' + quote + '"' + ' -' + author + '&hashtags=randomquote');
}
// Main program
$(document).ready(function() {
  //renderQuote(quotes);   //initial quote display
  $('#newQuoteBtn').click(function() { 
    //renderQuote(quotes);   
    jqxhr.done(function(data) {
      renderQuote(data);
    });
  });
});