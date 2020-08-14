import React from 'react';
import './QuestionInput.css';

export default function QuestionInput(props) {
	function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	return (
		<div>
			{props.inputType === 'file' ? (
				<div className="input-area">
					<label htmlFor={props.label} className="custom-file-input">
						Upload
						<input
							data-type={props.inputType}
							type="file"
							name={props.label}
							id={props.label}
							onChange={props.changeHandler}
							autocomplete="off"
						/>
					</label>
				</div>
			) : (
				<div className="input-area">
					<textarea
						data-type={props.inputType}
						name={props.label}
						onChange={props.changeHandler}
						autocomplete="off"
					/>
				</div>
			)}
			<button className="upload-button" name={props.label} value="text" onClick={props.inputTypeHandler}>
				Upload Text
			</button>
			<button className="upload-button" name={props.label} value="file" onClick={props.inputTypeHandler}>
				Upload Image
			</button>
		</div>
	);
}
