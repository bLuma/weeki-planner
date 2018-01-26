import React from 'react'
import App from './App'
import Login from './Login'
import PropTypes from 'prop-types'
import Api from './api'

class AppRouter extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      user: undefined,
      apikey: undefined
    }

    this.api = new Api()
    this.setUser = this.setUser.bind(this)
    this.handleValidationFail = this.handleValidationFail.bind(this)
    this.handleValidationSuccess = this.handleValidationSuccess.bind(this)

    if (this.props.getCachedCredentials() !== null && this.props.getCachedCredentials() !== '') {
      this.api.validateUser(this.props.getCachedCredentials(), this.handleValidationSuccess, this.handleValidationFail)
    }
  }
  
  handleValidationSuccess(user, apikey) {
    this.setUser(user, apikey)
  }

  handleValidationFail() {
    console.log('failed validation')
  }


  setUser(user, apikey) {
    this.setState({
      user: user,
      apikey: apikey
    })

    this.props.setCachedCredentials(apikey)
  }

  render() {
    return (
      <div>
        {this.state.user === undefined ?
          <Login setUserCallback={this.setUser} />
         :
          <App user={this.state.user} apikey={this.state.apikey} dateTimeFormat={this.props.dateTimeFormat} />}
      </div>
    )
  }
}

// AppRouter.propTypes = {
//   setCachedCredentials: PropTypes.func,
//   getCachedCredentials: PropTypes.func,
//   dateTimeFormat: PropTypes.object
// }

export default AppRouter;
