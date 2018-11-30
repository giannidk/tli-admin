import React, { Component } from 'react';
import LoginBox from '../components/widgets/login'

class UserLogin extends Component {

  render() {
    return (
      <div className="loginOuterContainer">
        <div className="loginInnerContainer col-xs-12 col-sm-8 col-md-6 col-lg-4">
          <LoginBox />
        </div>
      </div>
    );
  }
}


export default UserLogin