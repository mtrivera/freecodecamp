/*
valid user
if created_at AND updated_at EQUAL
has not been updated
API has changed, see link below:
http://forum.freecodecamp.com/t/problem-to-find-closed-twitch-accounts/42652/4
https://wind-bow.gomix.me/
https://wind-bow.hyperdev.space/
Client-ID' : 'nxwnokiukleazj1zcljvr4pa9z5n3zl
/users/:user, /channels/:channel, and /streams/:stream
*/
//use to see if user exists or has valid channel
const API_URL = 'https://wind-bow.gomix.me/twitch-api';

function ajaxModule() {
  //to see if a streamer is offline
  function findStream(stream) {
    let request = new XMLHttpRequest();
    request.open('GET', API_URL + '/streams/' + stream, true);
    request.onload = function() {
      var data = JSON.parse(this.response);
        console.log(data);
      }
    request.send();
  }
  //to see if a valid user
  function findUser(user) {
    let request = new XMLHttpRequest();
    request.open('GET', API_URL + '/users/' + user, true);
    request.onload = function() {
      var data = JSON.parse(this.response);
        console.log(data);
      }
    request.send();
  }
  //to get data to populate list
  function findChannel(channel) {
    let request = new XMLHttpRequest();
    request.open('GET', API_URL + '/channels/' + channel, true);
    request.onload = function() {
      var data = JSON.parse(this.response);
        console.log(data);
      }
    request.send();
  }

    return {
    findStream: findStream,
    findUser: findUser,
    findChannel: findChannel
  };
}
/*
function ajaxUserModule() {
  //to see if a streamer is offline
  function findUser(user) {
    let request = new XMLHttpRequest();
    request.open('GET', API_URL + '/users/' + user, true);
    request.onload = function() {
      var data = JSON.parse(this.response);
        console.log(data);
      }
    request.send();
  }
    return {
    findUser: findUser
  };
}*/

/*
var $listSelector = $('#list');
var streamers = ["ESL_DOTA2", "BeyondTheSummit", "cretetion", "comster404", "freecodecamp", "storbeck", "brunofin", "habathcx", "RobotCaleb", "noobs2ninjas"];

function findChannel(channel) {
    $.ajax({
      url: 'https://wind-bow.gomix.me/twitch-api/channels/' + channel,
      headers: { 'Accept' : 'application/vnd.twitchtv.v3+json'
      },
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        //console.log(data);
        $('div#list').html('<li>' + '<img class=logo width=96px height=96px src=' + data.logo + '>' + data.name + '<br / >' + data.status + '<br / >' + data.url + '<br />' + data.game + '</li>');
      },
      error: function (errObj, status, msg) {
        if(status) {
          console.log('User does not exist');
        }
      }
  });
}

function findUser(user) {
    $.ajax({
      url: 'https://wind-bow.gomix.me/twitch-api/users/' + user,
      headers: { 'Accept': 'application/vnd.twitchtv.v3+json'
      },
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        if (data.status === 404 || data.status === 422) {
          $('div#list').html('<p>' + user + ' ' + '<br />' + 'Account Removed or Does Not Exist' );
        } else {
          console.log( data );
        }
      }
  });
}
/*
//https://api.twitch.tv/kraken/streams?client_id=nxwnokiukleazj1zcljvr4pa9z5n3zl?user=comster404

//use to see if stream is online
//if data.stream !== null its online
function findStream(stream) {
  $.ajax({
    url: 'https://wind-bow.gomix.me/twitch-api/streams/' + stream,
    headers: { 'Accept': 'application/vnd.twitchtv.v3+json'
    },
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.stream === null) {
       $('div#list').html('<p>' + stream + ' ' + 'channel is OFFLINE' + '</p>');
      } else {
        $('div#list').html('<p>' + stream + ' ' + 'channel is ONLINE' + '</p>');
      }
    }
  });
}

function findStream(stream) {
  $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + stream, function (data) {
      if (data.stream === null) {
       $('div#list').html('<p>' + stream + ' ' + 'channel is OFFLINE' + '</p>');
      } else {
        $('div#list').html('<p>' + stream + ' ' + 'channel is ONLINE' + '</p>');
      }
   });
}
*/

//WORKS!!
var streamers = ["ESL_DOTA2", "BeyondTheSummit", "cretetion", "comster404", "freecodecamp", "storbeck", "brunofin", "habathcx", "RobotCaleb", "noobs2ninjas"];

//var test = new ajaxStreamModule();
var test2 = new ajaxModule();
test2.findChannel('crream');
//test.findStream('crream');
//test2.findUser('ESL_DOTA2');


/*
//Main Program
$(document).ready(function() {
});*/
