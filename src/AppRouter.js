import React from 'react'
//import {
//  BrowserRouter as Router,
//  Route,
//  Link
//} from 'react-router-dom'
import App from './App'
import Api from './api';

class Login extends React.PureComponent {
  constructor(props) {
    super(props)

    this.api = new Api()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    const username = this.login.value
    const password = this.password.value

    this.api.login(username, password, this.props.setUserCallback)
  }

  render() {
    return (
      <div>
        <input type="text" name="login" ref={input => this.login = input} />
        <input type="password" name="password" ref={input => this.password = input} />
        <input type="submit" onClick={this.onSubmit} />
      </div>
    )
  }
}

class AppRouter extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      user: undefined,
      apikey: undefined
    }

    this.setUser = this.setUser.bind(this)
  }

  setUser(user, apikey) {
    this.setState({
      user: user,
      apikey: apikey
    })
  }

  render() {
    return (
      <div>
        {this.state.user === undefined && <Login setUserCallback={this.setUser} />}
        {this.state.user !== undefined && <App user={this.state.user} apikey={this.state.apikey} />}
      </div>
    )
  }
}

export default AppRouter;
