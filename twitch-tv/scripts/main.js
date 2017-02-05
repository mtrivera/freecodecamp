function ajaxModule() {
  //to see if a streamer is offline
  function findStream(stream) {
    const API_URL = 'https://wind-bow.gomix.me/twitch-api';
    let request = new XMLHttpRequest();
    request.open('GET', API_URL + '/streams/' + stream, true);
    request.onload = function() {
      var data = JSON.parse(this.response);
       isStreamOnline(data, stream);
      }
    request.send();
  }
  //to see if a valid user
  function findUser(user) {
    const API_URL = 'https://wind-bow.gomix.me/twitch-api';
    let request = new XMLHttpRequest();
    request.open('GET', API_URL + '/users/' + user, true);
    request.onload = function() {
      var data = JSON.parse(this.response);
        isValidUser(data);
      }
    request.send();
  }
  //to get data to populate list
  function findChannel(channel) {
    const API_URL = 'https://wind-bow.gomix.me/twitch-api';
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
function isValidUser(user) {
  const NOT_FOUND = 404,
        UNPROCESSABLE = 422;
  if (user.status !== NOT_FOUND && user.status !== UNPROCESSABLE) {
    isStreamOnline(user);
  } else {
    var msg = document.createElement('p');
    var msgText = document.createTextNode(user.message);
    msg.appendChild(msgText);
    document.body.appendChild(msg);
  }
}

//use with findChannel
function displayChannelContent(channel) {
    addLogo(channel.logo, channel.name, channel.status);  /*+ '<br />' +
    channel.name + '<br / >' + channel.status + '<br / >' + channel.url +
    '<br />' + channel.game;*/
}

//to see if channel is online
function isStreamOnline(data, stream) {
  const netStatus = document.createElement('p');
  var netStatusTxt;
  if (data.stream !== null) {
    netStatusTxt = document.createTextNode(data.stream.channel.name +
    ' is ONLINE');
  } else {
    netStatusTxt = document.createTextNode(stream + ' is OFFLINE');
  }
  netStatus.appendChild(netStatusTxt);
  document.body.appendChild(netStatus);
}

// to display logo in list
function addLogo(url, stream, status) {
  var logoImage = new Image(96, 96);
  logoImage.src = url;
  logoImage.setAttribute('class', 'img-circle');
  logoImage.alt = stream + ' ' + status;
  document.body.appendChild(logoImage);
}

//use for creating list
function addListItem(streamer, netStatus) {
  var listItem = document.createElement('li');
  var listItemText = document.createTextNode(streamer + 'is ' + netStatus);
  listItem.appendChild(listItemText);
  document.body.appendChild(listItem);
}

//Main Program
(function main() {
  var xhr = new ajaxModule();
  var ul = document.createElement('ul');
  ul.setAttribute('class', 'streamerList');

  var t;
  var streamers = ["ESL_DOTA2", "BeyondTheSummit", "cretetion",
  "comster404", "freecodecamp", "storbeck", "brunofin", "habathcx",
  "RobotCaleb", "noobs2ninjas"];

  //document.getElementById('contentList').appendChild('ul');

  for(let count = 0; count < streamers.length; count += 1) {
    xhr.findUser(streamers[count]);
    /*var li = document.createElement('li');
    li.setAttribute('class', 'streamer');
    ul.appendChild('li');
    t = document.createTextNode(element);
    li.innerHTML = li.innerHTML + element;*/
  }
}());
