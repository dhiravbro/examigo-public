import React from 'react';

const noop = () => {};

const FileInput = ({ value, onChange = noop, name, ...rest }) => (
	<div>
		{Boolean(value.length) && <div>Selected files: {value.map((f) => f.name).join(', ')}</div>}
		<label>
			Click to select some files...
			<input
				{...rest}
				style={{ display: 'none' }}
				type="file"
				onChange={(e) => {
					onChange(name, [ ...e.target.files ]);
				}}
			/>
		</label>
	</div>
);

export default FileInput;
