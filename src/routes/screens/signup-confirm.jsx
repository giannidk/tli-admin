import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'


const SignupConfirm = ({ newUser }) => {
	console.log('USER: ', newUser)
	return (
		<Row>
			<Col sm={12}>
				<Panel>
					<Panel.Body>
						<h1>You are now registered ...</h1>
						<p>NEW USER: {newUser.displayName}, {newUser.email}</p>
					</Panel.Body>
				</Panel>
			</Col>
		</Row>
	)
}

export default SignupConfirm