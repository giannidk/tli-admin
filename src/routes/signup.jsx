import React, { Component } from 'react';
import SignupForm from '../components/signup-form'
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions';
import { Spinner } from '../components/main/spinner'

class Signup extends Component {

  render() {
    const { loading, user } = this.props
    if (loading) {
      return <Spinner />
    }
    return (
      <div className="loginOuterContainer">
        <div className="loginInnerContainer col-xs-12 col-sm-8 col-md-6 col-lg-4">
          {user
            ? <p>USER IS LOGGED, UID: {user.uid} </p>
            : <SignupForm onRegisterUser={(user) => this.props.signupUser(user)} />
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