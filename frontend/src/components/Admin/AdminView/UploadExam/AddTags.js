import React , {useState ,useEffect} from 'react';
import Chemistry from '../../../../SubjectDetails/Chemistry';
import Mathematics from '../../../../SubjectDetails/Math';
import Physics from '../../../../SubjectDetails/Physics';
import Biology from '../../../../SubjectDetails/Biology';
import ReactTags from 'react-tag-autocomplete';
const AddTags = (props) => {

	let subject;
	const [suggestions , setSuggestions] = useState([]);

useEffect(() => {
	switch (props.subject) {
		case 'phy':
			subject = Physics;
			break;
		case 'Physics':
			subject = Physics;
			break;
		case 'chem':
			subject = Chemistry;
			break;
		case 'Chemistry':
			subject = Chemistry;
			break;
		case 'math':
			subject = Mathematics;
			break;
		case 'Mathematics':
			subject = Mathematics;
			break;
		case 'bio':
			subject = Biology;
			break;
		case 'Biology':
			subject = Biology;
			break;
		default:
			subject = props.course === 'jee' ?  { ...Physics, ...Mathematics, ...Chemistry} :{ ...Physics, ...Chemistry ,...Biology};
	}
	const newArray = [];
	Object.keys(subject).map((chapter, index) => {
		console.log(chapter);
		newArray.push({ name: chapter, id: index });
	});
	setSuggestions(newArray);
}, [props.subject]);

	return (
		<div>
			<ReactTags
				tags={props.tags}
				suggestions={suggestions}
				onDelete={props.removeTag}
				onAddition={props.addTag}
				classNames={props.classNames}
			/>
		</div>
	);
};

export default AddTags;
