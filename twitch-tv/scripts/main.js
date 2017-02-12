/*promise get implementation
polyfills for ie8+
https://github.com/taylorhakes/promise-polyfill
https://github.com/stefanpenner/es6-promise //based on standard
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
// Returns a promise, fethces a url then parses the response as JSON
function getJSON(url) {
  return get(url).then(JSON.parse);
}

// use with findUser
function isUserValid(data) {
  const NOT_FOUND = 404;
  const UNPROCESSABLE = 422;
  var streamer = {};

  if (data.status !== NOT_FOUND && data.status !== UNPROCESSABLE) {
    const account_status = true;
    streamer = {
      account_status
    };
  } else {
    const errorMsg = data.message;
    const account_status = false;
    streamer = {
      errorMsg, account_status
    };
  }
  return streamer;
}

// to see if channel is online
function isStreamOnline(data, stream) {
  var streamer = {};

  if (data.stream === null) {
    const name = stream;
    const network_status = false;
    streamer = {
      name, network_status
    };
  } else {
    const name = data.stream.channel.name;
    const game = data.stream.game;
    const viewers = data.stream.viewers;
    const mature =  data.stream.channel.mature;
    const logo_url = data.stream.channel.logo;
    const stream_status = data.stream.channel.status;
    const stream_url =  data.stream.channel.url;
    const network_status = true;

    streamer = { name, game, viewers, mature, logo_url,
      stream_status, stream_url, network_status
    };
  }
  return streamer;
}

// to display logo in list
function addLogo(url, stream, status) {
  var logoImage = new Image(96, 96);
  logoImage.src = url;
  logoImage.setAttribute('class', 'img-circle');
  logoImage.alt = `${stream} ${status}`;
  document.body.appendChild(logoImage);
}

function addElm(name, data, tag) {
  var name = document.createElement(tag);
  var nameText = document.createTextNode(data);
  name.appendChild(nameText);
  document.body.appendChild(name);
}

// use for creating list
function addListItem(streamer, netStatus) {
  var listItem = document.createElement('li');
  var listItemText = document.createTextNode(`${streamer} is ${netStatus}`);
  listItem.appendChild(listItemText);
  document.body.appendChild(listItem);
}

// Main Program
(function main() {
  const API_URL = 'https://wind-bow.gomix.me/twitch-api';

  var ul = document.createElement('ul');
  ul.setAttribute('class', 'streamerList');
  const testUser = 'baduser404';
  var users = ['ESL_DOTA2', 'BeyondTheSummit', 'zai',
  'baduser404', 'freecodecamp', 'storbeck', 'brunofin', 'habathcx',
  'RobotCaleb', 'noobs2ninjas'];
  // Promise calls
  const userPromise = getJSON(`${API_URL}/users/${dota}`);
  const streamPromise = getJSON(`${API_URL}/streams/${dota}`);

  Promise.all([userPromise, streamPromise]).then((data) => {
    const userData = isUserValid(data[0]);
  // TODO: Work on promise logic, ask why spread operator does not work
    if (!userData.account_status) {
      console.log(userData.errorMsg);
    } else {
      const streamerData = isStreamOnline(data[1], dota);
      if(!streamerData.network_status) {
        //console.log(`${userData.name} is currently OFFLINE`);
      } else {
        console.log('User Exists! Display Streamer Data');
        addLogo(streamerData.logo_url, streamerData.name, streamerData.stream_status);
        console.log(streamerData);
      }
    }
  }).catch((error) => {
    console.log(error);
  });
  /***
  document.getElementById('contentList').appendChild('ul');

    console.log(streamers);
    var li = document.createElement('li');
    li.setAttribute('class', 'streamer');
    ul.appendChild('li');
    t = document.createTextNode(element);
    li.innerHTML = li.innerHTML + element;*/
}());
