/*
valid user
if created_at AND updated_at EQUAL
has not been updated
API has changed, see link below:
http://forum.freecodecamp.com/t/problem-to-find-closed-twitch-accounts/42652/4
https://wind-bow.gomix.me/
https://wind-bow.hyperdev.space/
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
        ifValidUser(data);
      }
    request.send();
  }
  //to get data to populate list
  function findChannel(channel) {
    let request = new XMLHttpRequest();
    request.open('GET', API_URL + '/channels/' + channel, true);
    request.onload = function() {
      var data = JSON.parse(this.response);
        displayChannelContent(data);
      }
    request.send();
  }

    return {
    findStream: findStream,
    findUser: findUser,
    findChannel: findChannel
  };
}

//use with findUser
function ifValidUser(user) {
  const NOT_FOUND = 404,
        UNPROCESSABLE = 422;
  if (user.status !== NOT_FOUND && user.status !== UNPROCESSABLE) {
    console.log(user.name + ' is VALID');
  } else {
    console.log(user.message);
  }
}

//use with findChannel
function displayChannelContent(channel) {
  const NOT_FOUND = 404;
  if (channel.status !== NOT_FOUND) {
    console.log(channel.logo  + '<br />' + channel.name + '<br / >' + channel.status
                + '<br / >' + channel.url + '<br />' + channel.game);
  } else {
    console.log('Invalid User. No Content to Display');
  }
}

//NOT DISPLAYING CORRECTLY
function isStreamOnline(data) {
  if (data.stream !== null) {
    console.log(data.stream.channel.name + ' channel is ONLINE');
  } else {
    console.log(data + ' channel is OFFLINE');
  }
}

//use for creating list
function addListItem(streamer, netStatus) {
  var listItem = document.createElement('li');
  var listItemText = document.createTextNode(streamer + 'is ' + netStatus);
  listItem.appendChild(listItemText);
  document.body.appendChild(listItem);
}

//WORKS!!
var streamers = ["ESL_DOTA2", "BeyondTheSummit", "cretetion", "comster404", "freecodecamp", "storbeck", "brunofin", "habathcx", "RobotCaleb", "noobs2ninjas"];

var test2 = new ajaxModule();

for (let count = 0; count < streamers.length; count += 1) {
  //test2.findStream(streamers[count]);
}
