import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Signup';
import AdminSignup from './AdminSignup';
import Homepage from './Homepage/Homepage';
import UserLayout from './User/Layout/Layout';
import AdminLayout from './Admin/AdminLayout/AdminLayout';

function Examigo() {
	let callContainer;
	const isUserLoggedin = useSelector((state) => state.user.isLoggedIn);
	const type = useSelector((state) => state.user.type);
	const type2 = useSelector((state) => state.admin.type);
	const isAdminLoggedin = useSelector((state) => state.admin.isLoggedIn);
	if (type === 'Student') {
		if (isUserLoggedin === false) {
			callContainer = <><Route path="/" component={Homepage} /></>;
		} else {
			callContainer = <Route path="/" component={UserLayout} />;
		}
	}

	if (type2 === 'Coaching') {
		if (isAdminLoggedin === true) {
			callContainer = <Route path="/" component={AdminLayout} />;
		}
	}

	return (
		<Router>
			<Switch>
				<Route path="/signup" component={Signup} />
				<Route path="/adminsignup" component={AdminSignup} />

				{callContainer}
			</Switch>
		</Router>
	);
}

export default Examigo;
