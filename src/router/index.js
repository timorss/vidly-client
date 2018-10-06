import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom' // Redirect, withRouter 
// import app2 from '../App2'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Genres from '../components/Genres'
import Error from '../components/Error'
import Navigation from '../components/Navigation'
import axios from 'axios'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory()

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route render={(props) => (
    localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
}

class RouterContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loggedIn: false,
      error:''
    }
    this.onLogout = this.onLogout.bind(this)
  }

  onSignUp({ name, email, password }) {
    axios.post('http://localhost:3000/api/users', {
      name,
      email,
      password
    })
      .then((res) => {
        console.log('user is: ', res.data);
        history.push("/login")
      })
      .catch(function (err) {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(err);
        }
      })
  }

  onLogin(values) {
    const { email, password } = values
    axios.post('http://localhost:3000/api/auth', {
      email,
      password
    })
      .then((res) => {
        console.log('token is: ', res.data);
        localStorage.setItem('token', res.data)
        console.log('LOCAL TOKEN', localStorage.getItem('token'));
        history.push("/genres")
        this.setState({ loggedIn: true })
      })
      .catch(function (err) {
        console.log(err.response.data);
        this.setState({ error: err.response.data })
      })
  }

  onLogout() {
    localStorage.removeItem('token')
    console.log('now the token is', localStorage.getItem('token'))
    history.push("/login")
    this.setState({ loggedIn: false })
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Navigation
            login={localStorage.getItem('token')}
            logout={this.onLogout}
          />
          <Switch>
            <Route path="/" exact
              render={() => <div>please login</div>} />
            <Route
              path={"/signUp"}
              render={() => <SignUp onSignUp={(values) => this.onSignUp(values)} />}
            // render={(props) => (
            //   this.state.signedUp
            //     ? <Redirect to="/login" />
            //     : <SignUp {...props} onSignUp={(values) => this.signUp(values)} />
            // )}
            />
            <Route
              path="/login"
              render={() => <Login onLogin={(values) => this.onLogin(values)} />} />
            <PrivateRoute path="/genres" component={Genres} />
            <Route component={Error} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default RouterContainer;

