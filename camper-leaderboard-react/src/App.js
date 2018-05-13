import React, { Component } from 'react';
import '../node_modules/bulma/css/bulma.css';

const Header = () => (
  <header>
    <h1 className="title">freeCodeCamp Camper Leaderboard</h1>
    <p>View the top 100 brownie point earners of all time or the last 30 days.<br />Brownie points
    are given to campers for helping other campers with questions in the gitter chatrooms.</p>
  </header>  
);

const Footer = () => (
  <footer>
    &copy;2018 Miguel T Rivera
  </footer>
);

class TableHeader extends Component {
  handleBrownieSortClick = (e) => {
    this.props.onFilterBrownieClick(e.target.value);
  }

  render() {
    return (
      <tr>
      <td>Rank</td>
      <td>Username</td>
      <td>Last 30 Days<button onClick={this.handleBrownieSortClick} value="recent"><i className="fas fa-sort-up su"></i></button></td>
      <td>All Time<button onClick={this.handleBrownieSortClick} value="alltime"><i className="fas fa-sort-up"></i></button></td>
      <td>Last Update</td>
    </tr>
    );
  }
}

// TODO: Add style with Bulma
class FilterableCamperTable extends Component {
  state = {
    campers: [],
    error: null,
    isLoaded: false,
  }

  handleBrownieSort = (endpoint) => {
    fetch(`https://fcctop100.herokuapp.com/api/fccusers/top/${endpoint}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          campers: result
        });
      }),
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
  }

  componentDidMount() {
    this.handleBrownieSort('recent');
  }

  render() {
    const campers = this.state.campers;
    const listCampers = campers.map((camper, index) => {
      return (
        <tr key={camper.username} className='is-clearfix'>
          <td>{index + 1}</td>
          <td><img className='image is-64x64 is-pulled-left' src={camper.img} alt=''/>{camper.username}</td>
          <td>{camper.recent}</td>
          <td>{camper.alltime}</td>
          <td>{camper.lastUpdate}</td>
        </tr>
      );
    });

    return (
      <table className='table is-bordered is-striped is-fullwidth'>
        <tbody>
          <TableHeader 
            onFilterBrownieClick={this.handleBrownieSort}
          />
          {listCampers}
        </tbody>
      </table>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <FilterableCamperTable />
        <Footer />
      </div>
    );
  }
}

export default App;
