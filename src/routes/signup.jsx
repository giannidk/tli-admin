import React, { Component } from 'react';
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

  handleUserRegistration(newUser) {
    this.props.signupUser(newUser, () => {
      this.setState({ newUserCreated: true })      
    })
  }

  render() {
    const { loading, signupError, user } = this.props

    if (loading) {
      return <Spinner />
    }
   
    return (
      <div className="loginOuterContainer">

        {user
          ? <SignupConfirm newUser={user} />
          : <div className="loginInnerContainer col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <SignupForm
              signupError={signupError}
              user={this.state.user}
              handleChange={(name, value) => this.handleChange(name, value)}
              handleUserTypeChange={(e) => this.handleChangeUserType(e)}
              onRegisterUser={(newUser) => this.handleUserRegistration(newUser)}
            />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loading, signupError, user } = auth;
  return { loading, signupError, user };
};

export default connect(mapStateToProps, { signupUser })(Signup)