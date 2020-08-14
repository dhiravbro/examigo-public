import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signupAdmin } from '../redux';

function AdminSignup(props) {
	const [ adminusername, setUsername ] = useState('');
	const [ adminemail, setEmail ] = useState('');
	const [ adminpassword, setPassword ] = useState('');
	const [ adminconfirmPassword, setConfirmPassword ] = useState('');

	return (
		<Container>
			<Row>
				<Col>
					<h1>Signup</h1>
					<Form className="form">
						<p>{props.msg}</p>
						<Form.Group controlId="formCategory1">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								defaultValue={props.username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formCategory2">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								defaultValue={props.email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formCategory3">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								defaultValue={props.password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formCategory4">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type="password"
								defaultValue={props.confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</Form.Group>
						<p>
							Already have an account?<a href="/">Login Here</a>
						</p>
						<Button
							variant="primary"
							onClick={() =>
								props.signupAdmin(adminusername, adminemail, adminpassword, adminconfirmPassword)}
						>
							SIGNUP
						</Button>
					</Form>
				</Col>
				<Col />
			</Row>
		</Container>
	);
}

const mapStatetoProps = (state) => {
	return {
		username: state.user.adminusername,
		email: state.user.adminemail,
		password: state.user.adminpassword,
		confirmPassword: state.user.adminconfirmPassword,
		msg: state.user.adminmsg
	};
};

const mapDispatchtoProps = (dispatch) => {
	return {
		signupAdmin: function(adminusername, adminemail, adminpassword, adminconfirmPassword) {
			dispatch(signupAdmin(adminusername, adminemail, adminpassword, adminconfirmPassword));
		}
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AdminSignup);
