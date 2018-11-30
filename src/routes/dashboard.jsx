import React, { Component } from 'react'
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap'
import { 
  UpcomingClasses,
  Teachers,
} from '../components/widgets'
import { Spinner } from '../components/main'
import QuickBook from '../components/widgets/quick-book'
import LoginBox from '../components/widgets/login'
import {
  teachers,
  upcomingDates,
} from '../constants'


import firebase from 'firebase'


class Dashboard extends Component {

  
  render() {
    console.log(this.props)
    return (
      <Row>
        <Col xs={12} sm={6}>
          <QuickBook />
        </Col>

        <Col xs={12} sm={3}>
        <UpcomingClasses data={upcomingDates} />
        </Col>
        
        <Col xs={12} sm={3}>        
        <LoginBox />
        {/* <Spinner /> */}
          {/* <Teachers data={teachers} /> */}
        </Col>

      </Row>
    )
  }
}

export default Dashboard