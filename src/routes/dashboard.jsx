import React, { Component } from 'react'
import {
  Row,
  Col,
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
        <UpcomingClasses data={upcomingDates} />
        </Col>
        
        <Col xs={12} sm={3}>
          <Teachers data={teachers} />
        </Col>

      </Row>
    )
  }
}

export default Dashboard