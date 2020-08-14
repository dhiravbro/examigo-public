import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { secdetail, getsec } from '../../../../redux';
import './UploadSec.css';
import SecTab from './SecTab';
function UploadSec(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getsec(localStorage.examid));
	}, []);

	const [ secDetails, setSecDetails ] = useState({
		secname: '',
		subject: 'phy',
		questype: 'scq',
		positive: '',
		negative: '',
		numques: ''
	});

	const changeHandler = (event) => {
		const { name, value } = event.target;
		setSecDetails((prevValue) => {
			return {
				...prevValue,
				[name]: value
			};
		});
	};

	return (
		<div className="upload-section-view">
			<p className="upload-section-title">Upload Section</p>

			<div className="Section-tab">
				{props.sec.map((sec ,index) => {
					return (
						<SecTab
							key={index}
							section_id={sec._id}
							positive={sec.positive}
							negative={sec.negative}
							typeofques={sec.typeofques}
							subject={sec.subject}
							secname={sec.secname}
						/>
					);
				})}
			</div>
			<div id="sec-name" className="upload-box">
				<label>Sec name : </label>
				<input
					className="form-input"
					type="text"
					name="secname"
					onChange={changeHandler}
					value={secDetails.secname}
				/>
			</div>
			<div id="subject" className="upload-select-box ">
				<label>Subject : </label>
				<select className="upload-select" name="subject" onChange={changeHandler} value={secDetails.subject}>
					<option value="phy">PHYSICS</option>
					<option value="chem">CHEMISTRY</option>
					<option value="math">MATHEMATICS</option>
					<option value="bio">BIOLOGY</option>
				</select>
			</div>
			<div id="pos-marks" className="upload-box ">
				<label>Positive Marks : </label>
				<input
					className="form-input"
					type="number"
					name="positive"
					onChange={changeHandler}
					value={secDetails.positive}
					onKeyDown={(event) => {
						if (event.key === '.') {
							event.preventDefault();
						}
					}}
					onInput={(event) => {
						event.target.value = event.target.value.replace(/[^0-9]*/g, '');
					}}
				/>
			</div>
			<div id="neg-marks" className="upload-box">
				<label>Negative Marks : </label>
				<input
					onKeyDown={(event) => {
						if (event.key === '.') {
							event.preventDefault();
						}
					}}
					onInput={(event) => {
						event.target.value = event.target.value.replace(/[^0-9]*/g, '');
					}}
					title="Numbers only"
					className="form-input"
					type="number"
					name="negative"
					onChange={changeHandler}
					value={secDetails.negative}
				/>
			</div>
			<div id="num-ques" className="upload-box">
				<label>Number of Questions : </label>
				<input
					onKeyDown={(event) => {
						if (event.key === '.') {
							event.preventDefault();
						}
					}}
					onInput={(event) => {
						event.target.value = event.target.value.replace(/[^0-9]*/g, '');
					}}
					title="Numbers only"
					className="form-input"
					type="number"
					name="numques"
					onChange={changeHandler}
					value={secDetails.numques}
				/>
			</div>
			<div id="ques-type" className="upload-select-box ">
				<label>Type of Question : </label>
				<select
					className="upload-select"
					type="select"
					name="questype"
					onChange={changeHandler}
					value={secDetails.questype}
				>
					<option value="scq">Single Option Correct</option>
					<option value="mcq">Multiple Option Correct</option>
					<option value="int">Integer Type</option>
					<option value="part">Partial Correct</option>
				</select>
			</div>
			<button
				className="addsec-btn"
				variant="primary"
				onClick={() =>
					props.secdetail(
						secDetails.secname,
						secDetails.subject,
						secDetails.positive,
						secDetails.negative,
						secDetails.questype,
						secDetails.numques,
						localStorage.examid
					)}
			>
				Add Section
			</button>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		exam: state.exam.examdetails,
		sec: state.exam.sec,
		loading: state.exam.secloading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		secdetail: function(secname, subject, positive, negative, typeofques, numques, examid) {
			dispatch(secdetail(secname, subject, positive, negative, typeofques, numques, examid));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadSec);
