import React from 'react'
import Api from './api';
import FontAwesome from 'react-fontawesome'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class Login extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { failedLogin: false, showSpinner: false, login: undefined, password: undefined }

    this.api = new Api()
    this.onSubmit = this.onSubmit.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.failedLogin = this.failedLogin.bind(this)
    this.hideFailedLogin = this.hideFailedLogin.bind(this)
  }

  componentDidMount() {
    // this.login.focus()
  }

  onSubmit() {
    if (this.state.showSpinner)
      return

    const username = this.state.login
    const password = this.state.password

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
    // if (this.state.failedLogin) {
    //     setTimeout(this.hideFailedLogin, 3000)
    // }

    return (
      <div className="loginform">
        {/* <label htmlFor="login">Login:</label> */}
        {/* <input type="text" id="login" name="login" ref={input => this.login = input} onKeyPress={this.onKeyPress} /> */}
        <TextField
          hintText='Login'
          floatingLabelText='Login'
          onChange={(e)=>this.setState({login:e.target.value})}
        />
        {/* <label htmlFor="password">Password:</label> */}
        {/* <input type="password" id="password" name="password" ref={input => this.password = input} onKeyPress={this.onKeyPress} /> */}
        <TextField
          hintText='Heslo'
          floatingLabelText='Heslo'
          type='password'
          onChange={(e)=>this.setState({password:e.target.value})}
        />

        {/* <div id="failedlogin" className={this.state.failedLogin ? "show" : ""}>Failed login!</div> */}


        <RaisedButton
          label={this.state.showSpinner ? <FontAwesome name="spinner" className="fa-spin" /> : "Login"}
          primary={true}
          onClick={this.onSubmit}
        />
        {/* <a className="button button-login" onClick={this.onSubmit}>
            {this.state.showSpinner ? <FontAwesome name="spinner" className="fa-spin" /> : "Login"}
        </a> */}

        <Snackbar
          open={this.state.failedLogin}
          message="Nepodařilo se přihlásit"
          autoHideDuration={4000}
          onRequestClose={this.hideFailedLogin}
        />
      </div>
    )
  }
}

export default Login
