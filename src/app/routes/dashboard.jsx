import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchCalendarEvents } from '../actions';
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

  componentWillMount() {    
    this.props.fetchCalendarEvents();
    console.log('PROPS: ', this.props)
}


  render() {
    console.log(this.props)
    if(!this.props.events) return <div>........</div>
    return (
      <Row>
        <Col xs={12} sm={6}>
          <UpcomingClasses data={this.props.events} />
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


function mapStateToProps({ events }) {
  /* return { 
      loading: clients.loading,
      error: clients.error,
      clients: clients.list
  }; */
  return events
}

export default connect(mapStateToProps, { fetchCalendarEvents })(Dashboard);