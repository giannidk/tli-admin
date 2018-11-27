import React, { Component } from 'react'
import { Thumbnail, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Card extends Component {

  render() {
    const { data } = this.props
    return (<Thumbnail src={data.img} alt="242x200">
      <h3>{data.first_name} {data.last_name}</h3>
      <h4>{data.chinese_last_name} {data.chinese_name}</h4>
      <p>{data.description}</p>
      <LinkContainer to={`/teachers/${data.id}`}>
        <Button bsStyle="primary" bsSize="small" block>View Details</Button>
      </LinkContainer>
    </Thumbnail>)
  }
}

export { Card }
