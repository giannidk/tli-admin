import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import SignupForm from '../components/signup-form'
import { connect } from 'react-redux';
import { signupUser } from '../store/actions';
import { Spinner } from '../components/main/spinner'
import SignupConfirm from './screens/signup-confirm'

class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        userEmail: '',
        userPassword: '',
        userDisplayName: '',
        loading: false,
      },
    }
  }

  handleChange(field, e) {
    this.setState((state) => ({ user: { ...state.user, [field]: e.target.value } }))
  }

  handleChangeUserType(e) {
    this.setState((state) => ({ user: { ...state.user, userIsTeacher: e.target.checked } }))
  }

  handleUserRegistration(user) {
    this.setState({ loading: true }, this.props.signupUser(user, () => {
      this.setState({ newUserCreated: true, loading: false })
    }))
  }

  render() {
    const { user } = this.props

    if (this.state.loading) {
      return <Spinner />
    }
   
    return (
      <div className="loginOuterContainer">

        {user
          ? this.state.newUserCreated
            ? <SignupConfirm newUser={user} />
            : /* <Redirect to={{
                pathname: '/dashboard',
                state: { from: this.props.location }
              }} /> */
              <SignupConfirm newUser={user} />
          : <div className="loginInnerContainer col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <SignupForm
              user={this.state.user}
              handleChange={(name, value) => this.handleChange(name, value)}
              handleUserTypeChange={(e) => this.handleChangeUserType(e)}
              onRegisterUser={(user) => this.handleUserRegistration(user)}
            />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default connect(mapStateToProps, { signupUser })(Signup)