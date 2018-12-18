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
    this.props.signupUser(user, () => {
      this.setState({ newUserCreated: true })
    })
  }

  render() {
    console.log('PROPS: ', this.props)
    const { loading, user } = this.props
    if (loading) {
      return <Spinner />
    }
    return (
      <div className="loginOuterContainer">
        <div className="loginInnerContainer col-xs-12 col-sm-8 col-md-6 col-lg-4">
          {user
            ? this.state.newUserCreated
              ? <SignupConfirm newUser={user} />
              : /* <Redirect to={{
                pathname: '/dashboard',
                state: { from: this.props.location }
              }} /> */<SignupConfirm newUser={user} />
            : <SignupForm
              user={this.state.user}
              handleChange={(name, value) => this.handleChange(name, value)}
              handleUserTypeChange={(e) => this.handleChangeUserType(e)}
              onRegisterUser={(user) => this.handleUserRegistration(user)}
            />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { error, loading, user } = auth;
  return { error, loading, user };
};

export default connect(mapStateToProps, { signupUser })(Signup)