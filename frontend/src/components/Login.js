import React, { useState } from 'react';
import { Modal , ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginUser, loginAdmin } from '../redux/index';

const Login = (props) => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ adminusername, setadminUsername ] = useState('');
	const [ adminpassword, setadminPassword ] = useState('');

	const [ activeTab, setActiveTab ] = useState('1');

	const toggletab = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<div>
			<Modal isOpen={props.showmodal} toggle={props.clicked}>
				<ModalHeader>Welcome to Examigo</ModalHeader>
				<ModalBody>
					<Nav tabs>
						<NavItem>
							<NavLink
								className={classnames({ active: activeTab === '1' })}
								onClick={() => {
									toggletab('1');
								}}
							>
								Student
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({ active: activeTab === '2' })}
								onClick={() => {
									toggletab('2');
								}}
							>
								Coaching
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent activeTab={activeTab}>
						<TabPane tabId="1">
							<Row>
								<Col sm="12">
									<Container>
										<Row>
											<Col>
												<h1>Student Login</h1>
												<Form className="form">
													<p>{props.msg}</p>
													<Form.Group>
														<Form.Label>Username</Form.Label>
														<Form.Control
															type="text"
															defaultValue={props.username}
															onChange={(e) => setUsername(e.target.value)}
														/>
													</Form.Group>

													<Form.Group>
														<Form.Label>Password</Form.Label>
														<Form.Control
															type="password"
															defaultValue={props.password}
															onChange={(e) => setPassword(e.target.value)}
														/>
													</Form.Group>
												</Form>
												<Button
													variant="primary"
													onClick={() => props.loginUser(username, password)}
												>
													Student Login
												</Button>
											</Col>
											<Col />
										</Row>
									</Container>
								</Col>
							</Row>
						</TabPane>

						<TabPane tabId="2">
							<Row>
								<Col sm="6">
									<Container>
										<Row>
											<Col>
												<h1>Coaching Login</h1>
												<Form className="form">
													<p>{props.adminmsg}</p>
													<Form.Group>
														<Form.Label>Username</Form.Label>
														<Form.Control
															type="text"
															defaultValue={props.adminusername}
															onChange={(e) => setadminUsername(e.target.value)}
														/>
													</Form.Group>

													<Form.Group>
														<Form.Label>Password</Form.Label>
														<Form.Control
															type="password"
															defaultValue={props.adminpassword}
															onChange={(e) => setadminPassword(e.target.value)}
														/>
													</Form.Group>
												</Form>
												<Button
													variant="primary"
													onClick={() => props.loginAdmin(adminusername, adminpassword)}
												>
													admin Login
												</Button>
											</Col>
											<Col />
										</Row>
									</Container>
								</Col>
							</Row>
						</TabPane>
					</TabContent>
				</ModalBody>
				<ModalFooter />
			</Modal>
		</div>
	);
};
const mapStatetoProps = (state) => {
	return {
		username: state.user.username,
		password: state.user.password,
		msg: state.user.msg,
		adminusername: state.admin.username,
		adminpassword: state.admin.password,
		adminmsg: state.admin.msg
	};
};

const mapDispatchtoProps = (dispatch) => {
	return {
		loginUser: function(username, password) {
			dispatch(loginUser(username, password));
		},

		loginAdmin: function(adminusername, adminpassword) {
			dispatch(loginAdmin(adminusername, adminpassword));
		}
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Login);
