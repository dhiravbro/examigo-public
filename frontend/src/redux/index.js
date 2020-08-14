export {
	signupUser,
	loginUser,
	setCurrentUser,
	logoutUser,
	showUser,
	updateUser,
	changePassword,
	showexam,
	attemptexam,
	attemptquestion,
	dashboard,
	calculation,
	attemptedExam,
	examAnalysis,
	addPost,
	allPost,
	addComment,
	deletePost,
	deleteComment
} from '../redux/action/useraction';
export {
	signupAdmin,
	loginAdmin,
	setCurrentAdmin,
	logoutAdmin,
	showAdmin,
	updateAdmin,
	getstudent,
	getallexams,
	hostexam,
	hostedexam,
	ranklist,
	deleteExam
} from '../redux/action/AdminAction';
export { uploaddetail, secdetail, quedetail, getsec, deletesec, deleteque } from '../redux/action/ExamAction';
