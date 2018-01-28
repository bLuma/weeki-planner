import React from 'react'
import Api from './api';
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

class Login extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { 
      failedLogin: false, 
      showSpinner: false, 
      login: undefined, 
      password: undefined 
    }

    this.api = new Api()
    this.onSubmit = this.onSubmit.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onLoginFail= this.onLoginFail.bind(this)
    this.onSnackbarRequestClose = this.onSnackbarRequestClose.bind(this)
  }

  onSubmit() {
    if (this.state.showSpinner)
      return

    const username = this.state.login
    const password = this.state.password

    this.setState({ showSpinner: true })
    this.api.login(username, password, this.props.setUserCallback, this.onLoginFail)
  }

  onKeyPress(evt) {
    if (evt.key === 'Enter') {
      this.onSubmit()
    }
  }

  onLoginFail() {
    this.setState({failedLogin: true, showSpinner: false})
  }

  onSnackbarRequestClose() {
    this.setState({failedLogin: false})
  }

  render() {
    return (
      <div className="loginform">
        <TextField
          autoFocus='true'
          hintText='Login'
          floatingLabelText='Login'
          onChange={(e)=>this.setState({login:e.target.value})}
        />
        <TextField
          hintText='Heslo'
          floatingLabelText='Heslo'
          type='password'
          onChange={(e)=>this.setState({password:e.target.value})}
        />
        
        <RaisedButton
          label={this.state.showSpinner ? <CircularProgress /> : "Login"}
          primary={true}
          onClick={this.onSubmit}
        />

        <Snackbar
          open={this.state.failedLogin}
          message="Nepodařilo se přihlásit"
          autoHideDuration={4000}
          onRequestClose={this.onSnackbarRequestClose}
        />
      </div>
    )
  }
}

export default Login
