import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ContentEditable extends Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
	}
	emitChange = () => {
		let html = ReactDOM.findDOMNode(this).innerHTML;
		if (html.trim() === '<br>') html = '';
		if (this.props.onChange && html !== this.lastHtml) {
			this.props.onChange({
				target: {
					value: html
				}
			});
		}
		this.lastHtml = html;
	};

	render() {
		return (
			<div
				className="editor"
				onInput={() => {
					this.emitChange();
				}}
				onBlur={this.emitChange}
				placeholder="Send your message ..."
				contentEditable
				dangerouslySetInnerHTML={{ __html: this.props.html }}
			/>
		);
	}
}

export default ContentEditable;
