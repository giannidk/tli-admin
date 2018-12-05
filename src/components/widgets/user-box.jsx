import firebase from 'firebase';
import React, { Component } from 'react';
import { Panel, Alert, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions';
import { Spinner } from '../main'

class UserBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  componentWillMount() {
    this.props.fetchUser()
    this.setState({user: this.props.user})
  }

  logoutUser() {
    firebase.auth().signOut()
  }



  render() {
    console.log('USER: ', this.state.user)
    const { user } = this.state
    /* const { handleSubmit, userEmail, userPassword } = this.props;
    if (this.state.loading) {
      return <Spinner />
    } */
    return (
      <Panel>
        <Panel.Heading>USER BOX</Panel.Heading>
        <Panel.Body>
          ........
          {user && user.uid}
          <br/>
          <Button onClick={() => this.logoutUser()}>Logout</Button>
        </Panel.Body>
      </Panel>
    );
  }
}



const mapStateToProps = ({ auth }) => {
  const { 
    //error, 
    //loading, 
    user 
  } = auth;
  return { 
    //error, 
    //loading, 
    user 
  };
};


export default connect(mapStateToProps, { fetchUser })(UserBox)