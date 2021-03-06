import React, { Component } from 'react';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value })
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onLogin(this.state)
  }

  render() {
    const { email, password } = this.state
    return (
      <div className="App" >

        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 50 }}>
          <h5>please login</h5>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
            <input type="text" value={email} onChange={this.onChangeEmail} placeholder="email" />
            <input type="text" value={password} onChange={this.onChangePassword} placeholder="password" />
            <input type="submit" value="signIn" className="calculate-button" />
          </form>
        </div>


      </div >
    );
  }
}

export default Login;
