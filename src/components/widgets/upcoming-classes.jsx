import React, { Component } from 'react'
import {
  ListGroup,
  ListGroupItem,
  Panel,
} from 'react-bootstrap'

class UpcomingClasses extends Component {

  renderClasses(){
		const classes = this.props.data.map((event, index) => {
			return ( <ListGroupItem key={index} header={event.date}>
        Teacher: <a href="/teachers">{event.teacher}</a>
      </ListGroupItem>)
    }) 
    return classes
   
	}

  render() {
    return (<Panel bsStyle="primary">
      <Panel.Heading>
        <Panel.Title componentClass="h3">Your upcoming classes</Panel.Title>
      </Panel.Heading>
      <ListGroup>
       {this.renderClasses()}
      </ListGroup>
      <Panel.Footer><a href="/calendar">View all in calendar</a></Panel.Footer>
    </Panel>)
  }
}

export { UpcomingClasses }
