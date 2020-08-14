import React, { Fragment, useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import AdminView from '../AdminView/AdminView';
import AdminSidebar from './AdminSidebar/AdminSidebar';
import './AdminLayout.css';
import { showAdmin } from '../../../redux';
const AdminLayout = (props) => {
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(showAdmin(props.admin.userid));
		},
		[ props.admin.userid ]
	);
	const [ toggleSidebar, setToggleSidebar ] = useState(true);

	const changeToggleState = () => {
		setToggleSidebar(!toggleSidebar);
	};
	return (
		<Fragment>
			<div className="Admin-View">
				<AdminSidebar toggle={toggleSidebar} toggler={changeToggleState} />
				{props.loading ? <h1>Loading</h1> : <AdminView toggle={toggleSidebar} />}
			</div>
		</Fragment>
	);
};
const mapStateToProps = (state) => {
	return {
		admin: state.admin.adminDetails,
		loading: state.admin.loading
	};
};
export default connect(mapStateToProps)(AdminLayout);
