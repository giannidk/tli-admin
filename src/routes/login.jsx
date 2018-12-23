import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LoginForm from '../components/widgets/login'
import { connect } from 'react-redux'
import { loginUser } from '../store/actions'
import { Spinner } from '../components/main/spinner'

class UserLogin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userEmail: '',
      userPassword: '',
    }
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value })
  }

  render() {
    const { loading, loginError, user } = this.props
    const { userEmail, userPassword } = this.state
    if (loading) {
      return <Spinner />
    }
    return (
      <div className="loginOuterContainer">
        <div className="loginInnerContainer col-xs-12 col-sm-8 col-md-6 col-lg-4">
          {user
            ? <Redirect to={{
              pathname: '/dashboard',
              state: { from: this.props.location }
            }} />
            : <LoginForm
              user={this.state}
              loginError={loginError}
              handleChange={(name, value) => this.handleChange(name, value)}
              onLoginUser={() => this.props.loginUser(userEmail, userPassword)}
            />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { loginError, loading, user } = auth
  return { loginError, loading, user }
}
export default connect(mapStateToProps, { loginUser })(UserLogin)