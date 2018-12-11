import React, { Component } from 'react'
import {
  Row,
  Col,
} from 'react-bootstrap'
import { 
  UpcomingClasses,
} from '../components/widgets'
import QuickBook from '../components/widgets/quick-book'
import UserBox from '../components/widgets/user-box'
import {
  upcomingDates,
} from '../constants'


class Dashboard extends Component {

  render() {
    return (
      <Row>
        <Col xs={12} sm={6}>
          <QuickBook />
        </Col>

        <Col xs={12} sm={3}>
        <UpcomingClasses data={upcomingDates} />
        </Col>
        
        <Col xs={12} sm={3}>        
        <UserBox />
        </Col>

      </Row>
    )
  }
}

export default Dashboard