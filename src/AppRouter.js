import React from 'react'
import App from './App'
import Login from './Login'
import PropTypes from 'prop-types'
import Api from './api'
import FontAwesome from 'react-fontawesome'

class AppRouter extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      user: undefined,
      apikey: undefined,
      validating: false
    }

    this.api = new Api()
    this.setUser = this.setUser.bind(this)
    this.handleValidationFail = this.handleValidationFail.bind(this)
    this.handleValidationSuccess = this.handleValidationSuccess.bind(this)

    const cachedCredentials = this.props.getCachedCredentials()
    if (cachedCredentials !== null && cachedCredentials !== '') {
      this.state.validating = true
      this.api.validateUser(this.props.getCachedCredentials(), this.handleValidationSuccess, this.handleValidationFail)
    }
  }
  
  handleValidationSuccess(user, apikey) {
    this.setUser(user, apikey)
  }
  
  handleValidationFail() {
    this.setState({validating: false})
    //console.log('failed validation')
  }

  setUser(user, apikey) {
    this.setState({
      user: user,
      apikey: apikey,
      validating: false
    })

    this.props.setCachedCredentials(apikey)
  }

  render() {
    return (
      <div>
        {this.state.user === undefined && !this.state.validating && 
          <Login setUserCallback={this.setUser} />}
        {this.state.user !== undefined && 
          <App user={this.state.user} apikey={this.state.apikey} dateTimeFormat={this.props.dateTimeFormat} />}
        {this.state.validating && 
          <div className="loginform">
            <FontAwesome name="spinner" className="fa-spin" />
          </div>}
      </div>
    )
  }
}

AppRouter.propTypes = {
  setCachedCredentials: PropTypes.func,
  getCachedCredentials: PropTypes.func,
  dateTimeFormat: PropTypes.func
}

export default AppRouter;
