import React, { Component } from 'react'
import {
  ListGroup,
  ListGroupItem,
  Panel,
  Glyphicon,
} from 'react-bootstrap'

class Teachers extends Component {

  renderTeachers() {
    const teachers = this.props.data.map((teacher, index) => {
      return (<ListGroupItem key={index}>
        <strong><a href="/teachers">{teacher.first_name} {teacher.last_name} ({teacher.chinese_last_name} {teacher.chinese_name})</a></strong>
        <br />
        <Glyphicon glyph="envelope" />: <a href="/teachers">{teacher.email}</a>
      </ListGroupItem>)
    })
    return teachers

  }

  render() {
    return (<Panel>
      <Panel.Heading>
        <Panel.Title componentClass="h3">Your teachers</Panel.Title>
      </Panel.Heading>
      <ListGroup>
        {this.renderTeachers()}
      </ListGroup>
      <Panel.Footer><a href="/teachers">View all</a></Panel.Footer>
    </Panel>)
  }
}

export { Teachers }
