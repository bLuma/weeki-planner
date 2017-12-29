import React from 'react'
import App from './App'
import Login from './Login';

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
        {this.state.user === undefined ?
          <Login setUserCallback={this.setUser} />
         :
          <App user={this.state.user} apikey={this.state.apikey} />}
      </div>
    )
  }
}

export default AppRouter;
