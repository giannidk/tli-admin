import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchUser, logoutUser } from '../../store/actions';

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

  renderUserData(){
    return Object.entries(this.state.user).map((value, key) => {
      return <li key={key} dangerouslySetInnerHTML={{
        __html: `<strong>${value[0]}:</strong> ${typeof value[1] !== 'object' &&  value[1]}`
      }} />
    } )
  }
  
  render() {
    const { user } = this.state
    console.table(user)
    return (
      <Panel>
        <Panel.Heading>USER BOX</Panel.Heading>
        <Panel.Body>
          {user.displayName}
          <hr />
          {user.email}
          <hr />
          {user.uid}
          <hr />
          <h4>Firebase User data</h4>
          <ul style={{'lineHeight': '1.8em'}}>
            {this.renderUserData()}
          </ul>     
          <br/>
          <Button onClick={() => this.props.logoutUser()}>Logout</Button>
        </Panel.Body>
      </Panel>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth
  return { user }
}

export default connect(mapStateToProps, { fetchUser, logoutUser })(UserBox)