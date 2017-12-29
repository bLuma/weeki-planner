import React from 'react'
import Api from './api';

class Login extends React.PureComponent {
  constructor(props) {
    super(props)

    this.api = new Api()
    this.onSubmit = this.onSubmit.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  onSubmit() {
    const username = this.login.value
    const password = this.password.value

    this.api.login(username, password, this.props.setUserCallback)
  }

  onKeyPress(evt) {
    if (evt.key === 'Enter') {
      this.onSubmit()
    }
  }

  render() {
    return (
      <div className="loginform">
        <label htmlFor="login">Login:</label>
        <input type="text" id="login" name="login" ref={input => this.login = input} onKeyPress={this.onKeyPress} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" ref={input => this.password = input} onKeyPress={this.onKeyPress} />
        <input type="submit" className="button" value="Login" onClick={this.onSubmit} />
      </div>
    )
  }
}

export default Login
