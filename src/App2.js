import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Genres from './Genres'
import SignUp from './SignUp'
import SignIn from './SignIn'

// const _axios = axios.create({
//   // baseURL: 'http://localhost:3000/api',
//   headers: { 'X-My-Custom-Header': 'foo' }
// })
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{}}>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <SignUp />
            <SignIn />
          </div>
          <h1 className="App-title">Genres</h1>
          <Genres />


        </div>
      </div >
    );
  }
}

export default App;
