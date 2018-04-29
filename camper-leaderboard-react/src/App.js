import React, { Component } from 'react';
import './App.css';

const Header = () => (
  <header>
    <h1>freeCodeCamp Camper Leaderboard</h1>
    <p>View the top 100 brownie point earners of all time or the last 30 days.<br />Brownie points
    are given to campers for helping other campers with questions in the gitter chatrooms.</p>
  </header>  
);

const Footer = () => (
  <footer>
    &copy;2018 Miguel T Rivera
  </footer>
);

const TableHeader = () => (
  <tr>
    <td>Rank</td>
    <td>Username</td>
    <td>Last 30 Days</td>
    <td>All Time</td>
    <td>Last Update</td>
  </tr>
);

// TODO: Add style with Bulma
class FilterableCamperTable extends Component {
  render() {
    const campers = this.props.campers;
    const listCampers = campers.map((camper, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td><img width="64" height="64" src={camper.img} alt=''/>{camper.username}</td>
          <td>{camper.recent}</td>
          <td>{camper.alltime}</td>
          <td>{camper.lastUpdate}</td>
        </tr>
      );
    });

    return (
      <table>{listCampers}</table>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TableHeader />
        <FilterableCamperTable campers={CAMPERS_R} />
        <Footer />
      </div>
    );
  }
}
// Last 30 days
const CAMPERS_R = [
  {
    "username":"sjames1958gm",
    "img":"https://avatars1.githubusercontent.com/u/4639625?v=4",
    "alltime":8826,
    "recent":104,
    "lastUpdate":"2018-04-04T09:10:12.456Z"
 },
 {
    "username":"Smootimus",
    "img":"https://avatars3.githubusercontent.com/u/6472304?v=4",
    "alltime":95,
    "recent":81,
    "lastUpdate":"2018-03-19T19:24:02.627Z"
 },
 {
    "username":"lydatech",
    "img":"https://avatars2.githubusercontent.com/u/2355633?v=4",
    "alltime":2497,
    "recent":72,
    "lastUpdate":"2018-03-19T19:13:02.050Z"
 },
 {
    "username":"khaduch",
    "img":"https://avatars2.githubusercontent.com/u/1930584?v=4",
    "alltime":3494,
    "recent":67,
    "lastUpdate":"2018-03-19T19:15:02.150Z"
  },
  {
    "username":"rahsheen",
    "img":"https://avatars1.githubusercontent.com/u/4641959?v=4",
    "alltime":1253,
    "recent":61,
    "lastUpdate":"2018-04-17T02:54:32.128Z"
  }
];

const CAMPERS_A = [
  {
    "username":"sjames1958gm",
    "img":"https://avatars1.githubusercontent.com/u/4639625?v=4",
    "alltime":8826,
    "recent":104,
    "lastUpdate":"2018-04-04T09:10:12.456Z"
 },
 {
    "username":"Manish-Giri",
    "img":"https://avatars2.githubusercontent.com/u/11348778?v=4",
    "alltime":6479,
    "recent":11,
    "lastUpdate":"2018-03-19T18:59:00.976Z"
 },
 {
    "username":"anthonygallina1",
    "img":"https://avatars.githubusercontent.com/u/11003055?v=3",
    "alltime":5514,
    "recent":18,
    "lastUpdate":"2018-03-19T19:11:01.874Z"
 },
 {
    "username":"diomed",
    "img":"https://avatars3.githubusercontent.com/u/72777?v=3",
    "alltime":5111,
    "recent":29,
    "lastUpdate":"2018-03-19T19:11:31.900Z"
 },
 {
    "username":"Masd925",
    "img":"https://avatars.githubusercontent.com/u/9335367?v=3",
    "alltime":4420,
    "recent":39,
    "lastUpdate":"2018-03-19T19:09:31.768Z"
 }
];

export default App;
