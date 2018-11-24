import React, { Component } from 'react'
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Panel,
} from 'react-bootstrap'
import {
  UpcomingClasses,
  Teachers,
} from '../components/widgets'
import {
  teachers,
  upcomingDates,
} from '../constants'



class Dashboard extends Component {
  render() {
    console.log(this.props)
    return (
      <Row>
        <Col xs={12} sm={6}>
          <UpcomingClasses data={upcomingDates} />
        </Col>

        <Col xs={12} sm={3}>
          <Teachers data={teachers} />
        </Col>

        <Col xs={12} sm={3}>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
            </Panel.Heading>
            <Panel.Body>Panel content</Panel.Body>
          </Panel>
        </Col>
      </Row>
    )
  }
}

export default Dashboard