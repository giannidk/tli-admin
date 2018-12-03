import React, { Component } from 'react'
import firebase from 'firebase'
import { FirebaseAuth } from 'react-firebaseui'
import { Jumbotron } from 'react-bootstrap'

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  // Redirect to /[page] after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/dashboard',
  // We will display Github as the auth provider.
  signInOptions: [
    {
      // Google provider must be enabled in Firebase Console to support one-tap
      // sign-up.
      //provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // Required to enable this provider in one-tap sign-up.
      //authMethod: 'https://accounts.google.com',
      // Required to enable ID token credentials for this provider.
      // This can be obtained from the Credentials page of the Google APIs
      // console.
      //clientId: 'xxxxxxxxxxxxxxxxx.apps.googleusercontent.com'
    },
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

class LoginAuth extends Component {
  render() {
    return (
      <Jumbotron>
        <FirebaseAuth 
          uiConfig={uiConfig} 
          uiCallback={ui => ui.disableAutoSignIn()}
          firebaseAuth={firebase.auth()} 
        />
      </Jumbotron>
    )
  }
}

export default LoginAuth