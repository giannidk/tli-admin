import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'


const SignupConfirm = ({ newUser }) => {
	console.log('USER: ', newUser)
	return (
		<Row>
			<Col sm={12}>
				<Panel>
					<Panel.Body>
						<h1>Welcome {newUser.displayName}</h1>
						<p>We sent an email with an activation code to <strong>{newUser.email}</strong>,
						please click on the activation link in the email to access the full features set of XXXX.</p>

						<h3>For Teachers</h3>
						<p>If you registered as a teacher, we will contact you soon about the status of your application. <br />
						If you want to register as a teacher in a later stage, you can do so by updating your profile settings. 
						</p>
						
						<h3>Get started</h3>
						<p>Here are a few ways to get you started...</p>


						<Col sm={12} md={4}>
							<Panel className="get-started-card">
								<Panel.Body>
									<h4>Complete your profile</h4>									
								</Panel.Body>
							</Panel>
						</Col>
						<Col sm={12} md={4}>
							<Panel className="get-started-card">
								<Panel.Body>
									<h4>Buy some credits</h4>									
								</Panel.Body>
							</Panel>
						</Col>
						<Col sm={12} md={4}>
							<Panel className="get-started-card">
								<Panel.Body>
									<h4>Find a teacher</h4>									
								</Panel.Body>
							</Panel>
						</Col>

					</Panel.Body>
				</Panel>
			</Col>
		</Row>
	)
}

export default SignupConfirm