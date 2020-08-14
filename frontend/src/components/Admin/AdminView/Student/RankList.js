import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { ranklist } from '../../../../redux';
 const RankList = (props) => {
	console.log(props);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(ranklist(props.match.params.examid));
	}, []);

	return <div />;
};

const mapStateToProps = (state) => ({
	ranklist: state.admin.ranklist
});

export default connect(mapStateToProps)(RankList);
