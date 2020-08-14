import React from 'react';

const InputType = (props) => {
	console.log(typeof props.value, props.type);
	let value = props.value;
	console.log(props);
	let input = null;
	switch (props.type) {
		case 'file':
			input = <input type="file" value={value} data-type="file" onChange={props.changeHandler} />;
			break;
		case 'text':
			input = <textarea value={value} data-type="text" onChange={props.changeHandler} />;break;
		default : input = null;
	}
	return input;
};

export default InputType;
