'use strict';   // Use strict mode

// Checks if user is valid
function isUserValid(data) {
  // 404: Not Found, 422: Unprocessable
  if (data.status === 404 &&
      data.status === 422) {
    return {
      account_status: false,
      error: data.message
    };
  } else {
    return { account_status: true };
  }
}

// Check if a channel is online
function getStreamData(data, stream) {
  if (data.stream === null) {
    return {
      name: stream,
      network_status: false
    };
  } else {
    return {
      name: data.stream.channel.name,
      game: data.stream.game,
      viewers: data.stream.viewers,
      mature: data.stream.channel.mature,
      logo_url: data.stream.channel.logo,
      stream_status: data.stream.channel.status,
      stream_url: data.stream.channel.url,
      network_status: true
    };
  }
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
  const logoImage = new Image(96, 96);
  logoImage.src = url;
  logoImage.setAttribute('class', 'img-circle');
  logoImage.alt = `${stream} ${status}`;
  document.body.appendChild(logoImage);
}

// Add an element to the DOM
function addElm(data, tag) {
  const elmName = document.createElement(tag);
  const elmText = document.createTextNode(data);
  elmName.appendChild(elmText);
  document.body.appendChild(elmName);
}

// Main Program
(function main() {
  const API_URL = 'https://wind-bow.glitch.me/twitch-api';
  const users = ['summitbc', 'simalexan','baduser404', 'freecodecamp', 'lanfest'
  ,'brunofin', 'thepetcollective', 'icrudebeef', 'RobotCaleb', 'noobs2ninjas'];

  const userPromise = users.map(user => fetch(`${API_URL}/users/${user}`)
    .then(res => res.json())
    .catch(err => console.error('Error:', err)));
  const streamPromise = users.map(stream => fetch(`${API_URL}/streams/${stream}`)
    .then(res => res.json())
    .catch(err => console.error('Error:', err)));

  const promises = userPromise.concat(streamPromise);
  // Promise call
  Promise.all(promises).then((data) => {
    // index 0-9 user promises, index 10-19 stream promises
    // NOTE: arr.slice(start, end): end is up to but NOT included
    const userData = data.slice(0, userPromise.length);
    const streamData = data.slice(streamPromise.length);

    return userData.map((elm, index, arr) => {
      const streamer = getStreamData(streamData[index], users[index]);
      
      if (!isUserValid(elm).account_status) {
        addElm(elm.message,'p');
      } else if (!streamer.network_status) {
        addElm(users[index], 'h3');
        addElm('OFFLINE', 'p');
      } else {
        addLogo(streamer.logo_url, streamer.name, streamer.stream_status);
        addLink(streamer);
        addElm(streamer.name, 'h3');
        addElm(streamer.viewers, 'p');
      }
    });
  }).catch((err) => {
    console.error(err);
  });
}());
