import React from 'react'
import Api from './api';
import FontAwesome from 'react-fontawesome'

class Login extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { failedLogin: false, showSpinner: false }

    this.api = new Api()
    this.onSubmit = this.onSubmit.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.failedLogin = this.failedLogin.bind(this)
    this.hideFailedLogin = this.hideFailedLogin.bind(this)
  }

  onSubmit() {
    const username = this.login.value
    const password = this.password.value

    this.setState({ showSpinner: true })
    this.api.login(username, password, this.props.setUserCallback, this.failedLogin)
  }

  onKeyPress(evt) {
    if (evt.key === 'Enter') {
      this.onSubmit()
    }
  }

  failedLogin() {
    this.setState({failedLogin: true, showSpinner: false})
  }

  hideFailedLogin() {
      this.setState({failedLogin: false})
  }

  render() {
    if (this.state.failedLogin) {
        setTimeout(this.hideFailedLogin, 3000)
    }

    return (
      <div className="loginform">
        <label htmlFor="login">Login:</label>
        <input type="text" id="login" name="login" ref={input => this.login = input} onKeyPress={this.onKeyPress} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" ref={input => this.password = input} onKeyPress={this.onKeyPress} />

        <div id="failedlogin" className={this.state.failedLogin ? "show" : ""}>Failed login!</div>

        <a className="button button-login" onClick={this.onSubmit}>
            {this.state.showSpinner ? <FontAwesome name="spinner" className="fa-spin" /> : "Login"}
        </a>
      </div>
    )
  }
}

export default Login
