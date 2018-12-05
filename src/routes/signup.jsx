import React, { Component } from 'react';
import SignupForm from '../components/signup-form'

class Signup extends Component {

  render() {
    return (
      <div className="loginOuterContainer">
        <div className="loginInnerContainer col-xs-12 col-sm-8 col-md-6 col-lg-4">
          <SignupForm />
        </div>
      </div>
    );
  }
}


export default Signup