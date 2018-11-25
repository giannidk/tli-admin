import React, { Component, Fragment } from 'react'
import { Row, Col, Panel, Thumbnail, Image, Button } from 'react-bootstrap'
import { Card } from '../components'
import { teachers } from '../constants'


class Teachers extends Component {

	renderCards(){
		const cards = teachers.map((teacher, index) => {
			return (<Col key={index} xs={12} sm={6} md={3}>
				<Card data={teacher} />
			</Col>)
		}) 
		return cards
	}
	render() {
		return (
			<Fragment>
				<Row>
					{this.renderCards()}
				</Row>


			</Fragment>
		)
	}
}

export default Teachers