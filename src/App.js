import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './components/layout/Header';
import About from './components/pages/About';
import LogIn from './components/pages/LogIn';
import Stream from './components/pages/Stream';
import TopStreams from './components/streams/TopStreams';
import TopGames from './components/games/TopGames';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      games: [],
      follows: [],
      id: '',
      profileInfo: [],
      pageName: '',
      streamName: '',
      streamsFetching: true,
      gamesFetching: true,
      folowsFetching: true,
      loginCheck: false,
      loggedIn: false,
    };
  }

  fetchStreams() {
    this.setState({ streamsFetching: true })
    axios.get('//127.0.0.1/streams', { withCredentials: true })
      .then(res => {
        this.setState({ streams: res.data['data'] })
      })
    this.setState({ streamsFetching: false })
  }

  fetchGames() {
    this.setState({ gamesFetching: true })
    axios.get('//127.0.0.1/games', { withCredentials: true })
      .then(res => {
        this.setState({ games: res.data['data'] })
      })
    this.setState({ gamesFetching: false })
  }

  fetchFollows() {
    this.setState({ folowsFetching: true })
    axios.get('//127.0.0.1/follows', { withCredentials: true })
      .then(res => {
        this.setState({ follows: res.data['data'] })
      })
    this.setState({ folowsFetching: false })
  }

  fetchData() {
    this.fetchStreams();
    this.fetchGames();
    this.fetchFollows();
  }

  fetchProfile() {
    this.setState({ isFetching: true })
    axios.get('//127.0.0.1/whoami', { withCredentials: true })
      .then(res => {
        res.data['data'].map((item) => this.setState({ profileInfo: item }));
      })
    this.setState({ loginCheck: true });
    this.setState({ isFetching: false })
  }

  loggedIn() {
    axios.get('//127.0.0.1/loggedin', { withCredentials: true })
      .then(res => this.setState({ loggedIn: res.data }))
  }

  componentDidMount() {
    this.fetchProfile();
    this.fetchData();
    this.timer = setInterval(() => {
      this.fetchData()
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    if (!this.state.loginCheck) {
      this.loggedIn();
    }
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header loggedIn={this.state.loggedIn} />
            <Switch>
              <Route path="/login">
                <LogIn profileInfo={this.state.profileInfo} />
              </Route>
              <Route path="/about" component={About} />
              <Route path="/:stream" component={Stream} />
              <Route path="/">
                <StreamList streams={this.state.streams} />
                <GameList games={this.state.games} />
              </Route>/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
