import React, { Component, Fragment } from 'react'
import { Row, Col, Panel, Thumbnail, Image, Button } from 'react-bootstrap'
import { Card } from '../components'
import { teachers } from '../constants'


class TeacherDetails extends Component {
	render() {
		const { key } = this.props.match.params
		return (
				<Row>
					<Col xs={12} sm={6} md={3}>
					<h1>Details {key}</h1>
					</Col>
				</Row>
		)
	}
}

export default TeacherDetails