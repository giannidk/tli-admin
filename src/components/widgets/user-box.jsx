import firebase from 'firebase';
import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchUser, logoutUser } from '../../redux/actions';
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
    const { user } = this.state
    if (this.state.loading) {
      return <Spinner />
    }
    return (
      <Panel>
        <Panel.Heading>USER BOX</Panel.Heading>
        <Panel.Body>
          {user.email}
          <hr />
          {user.uid}
          <br/>
          <Button onClick={() => this.props.logoutUser()}>Logout</Button>
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


export default connect(mapStateToProps, { fetchUser, logoutUser })(UserBox)