/*promise get implementation
polyfills for ie8+
https://github.com/taylorhakes/promise-polyfill
https://github.com/stefanpenner/es6-promise
https://developers.google.com/web/fundamentals/getting-started/primers/promises
*/
function get(url) {
  // Return a new promise
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url, true);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusTxt));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error('Network Error'));
    };

    // Make the request
    req.send();
  });
}
/*
function ajaxModule() {
  //to see if a streamer is offline and get data
  function findStream(stream) {
    const API_URL = 'https://wind-bow.gomix.me/twitch-api';
    let request = new XMLHttpRequest();
    request.open('GET', API_URL + '/streams/' + stream, true);
    request.onload = function streamDataParse() {
      var data = JSON.parse(this.response);
       isStreamOnline(data, stream);
      }
    request.send();
  }

  //to see if a valid user
  function findUser(user) {
    var streamer = {};
    const API_URL = 'https://wind-bow.gomix.me/twitch-api';
    let request = new XMLHttpRequest();
    request.open('GET', API_URL + '/users/' + user, true);
    request.onload = function userDataParse() {
      var data = JSON.parse(this.response);
      isUserValid(data, user);
    }
    request.send();
  }

  return {
    findStream: findStream,
    findUser: findUser
  };
}
*/
//use with findUser
function isUserValid(data, user) {
  const NOT_FOUND = 404;
  const UNPROCESSABLE = 422;
  var streamer = {};

  if (data.status !== NOT_FOUND && data.status !== UNPROCESSABLE) {
    streamer.name = data.name;
    streamer.account_status = true;
  } else {
    streamer.name = user;
    streamer.account_status = false;
  }
  return streamer;
}

//to see if channel is online
function isStreamOnline(data, stream) {
  const netStatus = document.createElement('p');
  var netStatusTxt;
  var statusP;
  if (data.stream !== null) {
    addLogo(data.stream.channel.logo, data.stream.channel.name, data.stream.channel.status);
    netStatusTxt = document.createTextNode(data.stream.channel.name +
    ' is ONLINE');
    addElm(statusP, data.stream.channel.status, 'p');
    /*var statusP = document.createElement('p');
    var statusPText = document.createTextNode(data.stream.channel.status);
    statusP.appendChild(statusPText);
    document.body.appendChild(statusP);*/
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

function addElm(name, data, tag) {
  var name = document.createElement(tag);
  var nameText = document.createTextNode(data);
  name.appendChild(nameText);
  document.body.appendChild(name);
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

  var users = ["ESL_DOTA2", "BeyondTheSummit", "cretetion",
  "comster404", "freecodecamp", "storbeck", "brunofin", "habathcx",
  "RobotCaleb", "noobs2ninjas"];

  //document.getElementById('contentList').appendChild('ul');

    //console.log(streamers);
    /*var li = document.createElement('li');
    li.setAttribute('class', 'streamer');
    ul.appendChild('li');
    t = document.createTextNode(element);
    li.innerHTML = li.innerHTML + element;*/
}());
