/*new quote button and app work :D
http://joelb.me/blog/2012/tutorial-creating-a-custom-tweet-button-with-counter/
https://dev.twitter.com/web/tweet-button/web-intent
todo: 
add css 
error checking for quotes longer than 140 characters 
add toggle for changing quote category? http://www.bootstraptoggle.com/
change magic numbers / strings to variables
*/
var quotes = [
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
];
/*
function getQuote() {
  $.ajax({
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/",
    data:{
      cat: "famous"   //other option is 'movies'
    }, 
    headers:{
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    type: "GET",
    dataType: "json",
    cache: false,
    success: function(data) {
      $('div.quote-content').empty().append(data.quote + '<br />');
      $('div.quote-author').empty().append('-' + data.author);
      $('.tweet').attr('href','https://twitter.com/intent/tweet?text=' + '"' + data.quote + '"' + ' -' + data.author + '&hashtags=randomquote');
     }     
  });
}//end getQuote
*/
$(document).ready(function() {
  getQuote();  //initial quote display
  $('#newQuoteBtn').click(function() { 
    getQuote();
  });
});