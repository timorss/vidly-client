import React, { Component } from 'react';
import './App.css';
import Router from './router'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="App" >
          <Router />
      </div>
    );
  }
}

export default App;
