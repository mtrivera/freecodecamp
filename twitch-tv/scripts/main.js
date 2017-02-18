/*promise get implementation
polyfills for ie8+
https://github.com/taylorhakes/promise-polyfill
https://github.com/stefanpenner/es6-promise //based on standard
https://developers.google.com/web/fundamentals/getting-started/primers/promises
https://bevacqua.github.io/promisees/#
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

// Checks if user is valid
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
    const account_status = false;
    const errorMsg = data.message;
    streamer = {
      account_status, errorMsg
    };
  }
  return streamer;
}

// Check if a channel is online
function getStreamData(data, stream) {
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
// Create link from stream status output
function addLink(linkData) {
  const link = document.createElement('a');
  link.text = linkData.stream_status;
  link.href = linkData.stream_url;
  link.target = '_blank';
  document.body.appendChild(link);
}

// To display logo in list
function addLogo(url, stream, status) {
  var logoImage = new Image(96, 96);
  logoImage.src = url;
  logoImage.setAttribute('class', 'img-circle');
  logoImage.alt = `${stream} ${status}`;
  document.body.appendChild(logoImage);
}

// Add an element to the DOM
function addElm(name, data, tag) {
  var name = document.createElement(tag);
  var text = document.createTextNode(data);
  name.appendChild(text);
  document.body.appendChild(name);
}

// Main Program
(function main() {
  const API_URL = 'https://wind-bow.gomix.me/twitch-api';

  //Is this needed?
  /***var ul = document.createElement('ul');
  *ul.setAttribute('class', 'streamerList');*/

  var users = ['BeyondTheSummit', 'zai','baduser404', 'freecodecamp',
  'moonducktv', 'brunofin', 'dotacapitalist', 'ESL_DOTA2', 'RobotCaleb',
  'noobs2ninjas'];

  const userPromise = users.map(user => getJSON(`${API_URL}/users/${user}`));
  const streamPromise = users.map(stream => getJSON(`${API_URL}/streams/${stream}`));
  const promises = userPromise.concat(streamPromise);
  // Promise call
  Promise.all(promises).then((data) => {
    // index 0-9 user promises, index 10-19 stream promises
    // NOTE: arr.slice(start, end): end is up to but NOT included
    const userData = data.slice(0, users.length);
    const streamData = data.slice(users.length, users.length * 2);

    userData.forEach((elm, index, arr) => {
      if (!isUserValid(elm).account_status) {
        const userStatusMsg = '';
        addElm(userStatusMsg, elm.message,'p');
      } else if (streamData[index]['stream'] != null){
        const streamStatusMsg = '';
        const streamName = '';
        const viewersNum = 0;
        //TODO: The calls below, use the console.log below as a guide:
        //console.log( getStreamData(streamData[index], users[index]).network_status );
        addLogo(streamData.elm.logo_url, streamData.elm.name, streamData.elm.stream_status);
        addLink(streamData.elm);
        addElm(streamName, streamData.elm.name, 'h3');
        addElm(viewersNum, streamData.elm.viewers, 'p');
      } else {
        const msg = '';
        const streamName = '';
        addElm(streamName, users[index], 'h3');
        addElm(msg, 'OFFLINE', 'p');
      }
    });
  }).catch((err) => {
    console.error(err);
  });
}());
