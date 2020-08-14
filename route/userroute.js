let express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
let userModel = require('../models/usermodel');
let AdminModel = require('../models/adminmodel');
let userprofile = require('../models/userprofile');
let Exammodel = require('../models/Exammodel');
let ResponseModel = require('../models/ResponseModel');
let postModel = require('../models/Discussion');
let Auth = require('../config/Auth');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const multer =require('multer');
const path=require('path');



var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, './public/uploads')
	},
	filename: function (req, file, cb) {
	  const uniqueSuffix = 'Examigofile'+ Date.now() + '-' + Math.round(Math.random() * 1E9)
	  cb(null, uniqueSuffix+file.originalname)
	}
  })
  
  var upload = multer({ storage: storage })
router.use(express.json());

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/login', function(req, res) {
	let username = req.body.username;
	userModel
		.find({ username: username })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				res.status(404).json({
					message: 'Auth Failed'
				});
			} else {
				bcrypt.compare(req.body.password, user[0].password, function(err, result) {
					if (err) {
						res.json({
							message: 'Auth Failed'
						});
					}
					if (result) {
						let token = jwt.sign(
							{
								username: user[0].username,
								userid: user[0]._id,
								type: 'Student'
							},
							'secret',
							{
								expiresIn: '8h'
							}
						);
						res.status(200).json({
							message: 'User Found',
							token: token
						});
					} else {
						res.json({
							message: 'Auth Failed'
						});
					}
				});
			}
		})
		.catch((err) => {
			res.json({
				error: err
			});
		});
});

router.post('/signup', function(req, res) {

	let username = req.body.username;
	let email = req.body.email;
	let password = req.body.password;
	let confirmPassword = req.body.confirmpassword;

	if (password !== confirmPassword) {
		res.json({
			message: 'Password Not Matched!'
		});
	} else {
		bcrypt.hash(password, 10, function(err, hash) {
			if (err) {
				return res.json({
					message: 'Something Wrong, Try Later!',
					error: err
				});
			} else {
				let userDetails = new userModel({
					username: username,
					email: email,
					password: hash
				});

				userDetails
					.save()
					.then((doc) => {
						const profile = userprofile({
							user: doc._id,
							username: username
						});

						profile.save();

						res.status(201).json({
							message: 'User Registered Successfully',
							results: doc
						});
					})
					.catch((err) => {
						res.json(err);
					});
			}
		});
	}
});

router.post('/adminlogin', function(req, res) {

	let username = req.body.username;
	AdminModel.find({ username: username })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				res.status(404).json({
					message: 'Auth Failed'
				});
			} else {
				bcrypt.compare(req.body.password, user[0].password, function(err, result) {
					if (err) {
						res.json({
							message: 'Auth Failed'
						});
					}
					if (result) {
						let token = jwt.sign(
							{
								username: user[0].username,
								userid: user[0]._id,
								type: 'Coaching'
							},
							'secret',
							{
								expiresIn: '8h'
							}
						);
						res.status(200).json({
							message: 'User Found',
							token: token
						});
					} else {
						res.json({
							message: 'Auth Failed'
						});
					}
				});
			}
		})
		.catch((err) => {
			res.json({
				error: err
			});
		});
});

router.post('/adminsignup', function(req, res) {
	
	let username = req.body.username;
	let email = req.body.email;
	let password = req.body.password;
	let confirmPassword = req.body.confirmpassword;

	if (password !== confirmPassword) {
		res.json({
			message: 'Password Not Matched!'
		});
	} else {
		bcrypt.hash(password, 10, function(err, hash) {
			if (err) {
				return res.json({
					message: 'Something Wrong, Try Later!',
					error: err
				});
			} else {
				let userDetails = new AdminModel({
					username: username,
					email: email,
					password: hash
				});

				userDetails
					.save()
					.then((doc) => {
						res.status(201).json({
							message: 'User Registered Successfully',
							results: doc
						});
					})
					.catch((err) => {
						res.json(err);
					});
			}
		});
	}
});
router.post('/changepassword',Auth, async (req, res) => {

	try{
		let username = req.body.username;
		let userDetails;
		if(req.body.type==='student'){
			userDetails=await userModel.find({ username: username })
		}else(
			userDetails=await adminModel.find({ username: username })
		)
	

					bcrypt.compare(req.body.oldpassword, userDetails[0].password, function(err, result) {
						if (err) {
							console.log('wrong');
							res.json('wrong password');
						}
						if (result) {
							console.log(result);
							bcrypt.hash(req.body.newpassword, 10, function(err, hash) {
						
								userDetails[0].password=hash;
								console.log(userDetails[0].password,hash);
								userDetails[0].save();
								
							});
							res.json('sucess');
						} 
					});
				
					
	}catch{

	}
	
});
router.get('/userprofile/:userid', Auth, async (req, res) => {
	try {
		let userid = req.params.userid;

		const profileuser = await userprofile.findOne({ user: userid });

		res.json(profileuser);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});
router.get('/adminprofile/:adminid', Auth, async (req, res) => {
	try {
		let adminid = req.params.adminid;

		const profileuser = await userprofile.findOne({ user: adminid });

		res.json(profileuser);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});
router.post('/exampapers', Auth, async (req, res) => {
	try {
		let coaching = req.body.coaching;

		let course = req.body.course;
		let host = '1';

		const exams = await Exammodel.find(
			{ admin: coaching, course: course, host: host },
			{ examname: 1, description: 1, course: 1, examdate: 1, duration: 1, examtime: 1,attemptedstudent:1 }
		).sort({date:-1});

		res.json(exams);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});

router.post('/students', Auth, async (req, res) => {
	try {
		const coaching = req.body.userid;

		const student = await userprofile.find({ coaching: coaching });
		res.json(student);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});

router.patch('/updateprofile', Auth, async (req, res) => {
	try {
		let Phonenumber = req.body.phonenumber;
		let Email = req.body.email;
		let City = req.body.city;
		let State = req.body.state;
		let Avatar = req.body.avatar;
	
		await userprofile.findById(req.body.profileid, function(err, data) {
			(data.phonenumber = Phonenumber ? Phonenumber : data.phonenumber),
				(data.city = City ? City : data.city),
				(data.state = State ? State : data.state),
				(data.email = Email ? Email : data.email);
				(data.avatar = Avatar ? Avatar : data.avatar);
			data.save();
			res.json(data);
		});
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});

router.post('/uploaddetail', Auth, async (req, res) => {
	try {
	
		let admin = req.user.userid;
		let description = req.body.description;
		let course = req.body.course;
		let examname = req.body.examname;
		let Class = req.body.classs;
		let host = 0;

		let examdetail = new Exammodel({
			admin: admin,
			examname: examname,
			course: course,
			class: Class,
			description: description,
			host: host
		});

		const exam = await examdetail.save();

		res.json(exam);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});

router.put('/secdetail/:examid', Auth, async (req, res) => {
	try {
		
		let secname = req.body.secname;
		let typeofques = req.body.typeofques;
		let positive = req.body.positive;
		let negative = req.body.negative;
		let subject = req.body.subject;

		let secdetail = {
			subject,
			secname,
			typeofques,
			positive,
			negative
		};

		const exam = await Exammodel.findById(req.params.examid);

		exam.sec.unshift(secdetail);

		await exam.save();

		res.json(exam.sec);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});

router.put('/ques/:examid/:secid',upload.fields([
	{
	name: 'questionfile', maxCount: 1
	},
	{
	name: 'option1file', maxCount: 1
	},
	{
	name: 'option2file', maxCount: 1
   },
   {
	name: 'option3file', maxCount: 1
   },
   {
	name: 'option4file', maxCount: 1
  }]
  ), Auth, async (req, res) => {
	try {

		let option1;
		let option2;
		let option3;
		let option4;
		let question;
		if(req.body.question){
			question = req.body.question;
			
		}else{
			question=req.files['questionfile'][0].filename
		}
		if(req.body.option1){
			option1 = req.body.option1;
			
		}else{
			option1=req.files['option1file'][0].filename
		}
		if(req.body.option2){
			option2 = req.body.option2;
			
		}else{
			option2=req.files['option2file'][0].filename
		}
		if(req.body.option3){
			option3 = req.body.option3;
			
		}else{
			option3=req.files['option3file'][0].filename
		}
		if(req.body.option4){
			option4 = req.body.option4;
			
		}else{
			option4=req.files['option4file'][0].filename
		}
		let correct=req.body.correct;
		let tag=req.body.Tags;
		tag=JSON. parse(tag);
		
		
		let questiondetail = {
			question,
			option1,
			option2,
			option3,
			option4,
			correct,
			tag
		};

		const exam = await Exammodel.findById(req.params.examid);

		const sec = exam.sec.id(req.params.secid);

		const ques = sec.question.push(questiondetail);
	
		await exam.save();

		res.json(sec);
		
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'Question not found' });

		res.status(500).send('Server Error');
	}
});

router.get('/allexam/:id', Auth, async (req, res) => {
	try {
		const exams = await Exammodel.find(
			{ admin: req.params.id, host: '0' },
			{ examname: 1, description: 1, course: 1, class: 1 }
		);
		res.json(exams);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'No exam found' });

		res.status(500).send('Server Error');
	}
});

router.get('/getsec/:examid', Auth, async (req, res) => {
	try {
		const exam = await Exammodel.findById(req.params.examid);

		res.json(exam.sec);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});
router.post('/deletepaper', Auth, async (req, res) => {
	try {
		 await Exammodel.findByIdAndDelete(req.body.examid) 
		.catch(err => res.status(400).send(err.message));
		
		res.json(req.body.examid);
	}
     catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});
router.post('/deletesec', Auth, async (req, res) => {
	try {
		const exam = await Exammodel.findById(req.body.examid);
		const section=exam.sec.id(req.body.secid)
		section.remove();
		exam.save();


		res.json(exam.sec);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});
router.post('/deleteque', Auth, async (req, res) => {
	try {
		const exam = await Exammodel.findById(req.body.examid);
		const section=exam.sec.id(req.body.secid);
		const question=section.question.id(req.body.queid);
		question.remove();
		exam.save();


		res.json(exam.sec);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});
router.patch('/editsec', Auth, async (req, res) => {
	try {
		
		let secname = req.body.secname;
		let typeofques = req.body.typeofques;
		let positive = req.body.positive;
		let negative = req.body.negative;
		let subject = req.body.subject;

	
		await ExamModel.findById(req.body.examid, function(err, data) {
			data.sec.id(req.body.secid)
			(data.phonenumber = Phonenumber ? Phonenumber : data.phonenumber),
				(data.city = City ? City : data.city),
				(data.state = State ? State : data.state),
				(data.email = Email ? Email : data.email);
				(data.avatar = Avatar ? Avatar : data.avatar);
			data.save();
			res.json(data);
		});
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});

router.patch('/finalstep', Auth, async (req, res) => {
	try {
		
		let Examdate = req.body.date;
		let Duration = req.body.duration*60*60;
		
		let Host = 1;

		let exam=await Exammodel.findById(req.body.id, function(err, data) {
	
			(data.examdate = Examdate ? Examdate : data.examdate),
				(data.duration = Duration ? Duration : data.duration),
	
				(data.host = Host ? Host : data.host);
			data.save();
			res.json(data._id);
		});
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});

router.get('/attemptexam/:id/:userid/:username', Auth, async (req, res) => {
	try {
		const exam = await Exammodel.findById(req.params.id);
		const examid = req.params.id;
		const userid = req.params.userid;
		const username = req.params.username;

		const answersheet = new ResponseModel({
			examid: examid,
			user: userid,
			examname:exam.examname,
			username:username
		});
		answersheet.save();
		res.json(exam);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'No exam found' });

		res.status(500).send('Server Error');
	}
});

router.put('/attemptquestion', Auth, async (req, res) => {
	try {

		let examid = req.body.examid;
		let userid = req.body.userid;
		let _id = req.body.questionid;
		let secid = req.body.secid;
		let subject = req.body.subject;
		let mark = req.body.mark;
	
		let paperdetail = {
			_id,
			subject,
			secid,
			mark
		};

		let answersheets = await ResponseModel.findOne({examid:examid,user:userid});
	
		
			if(answersheets.response.id(_id)){
		
				answersheets.response.id(_id).mark=mark;
				answersheets.save();	
			}else{
	
				answersheets.response.unshift(paperdetail);
				answersheets.save();
			}
			res.json("marked");

	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: ' noQuestiont found' });

		res.status(500).send('Server Error');
	}
});
router.get('/dashboard/:userid',Auth,async(req,res)=>{
	try{
		let mathcount=0;
		let Rank=0;
		let chemcount=0;
		let phycount=0;
		let totalmath=0;
		let totalchem=0;
		let totalphy=0;
		let totalStudent=0;
		let graphDetails;
		let lineCurve=[];
		let linecurve;
	let userid=req.params.userid;

	 const answer= await ResponseModel.find({user:userid}).sort({total:-1});

	 answer.forEach(async(answers) => {
			
				let examID=answers.examid;
		
			const exampaper= await ResponseModel.find({examid:examID}).sort({total:-1,math:-1,physics:-1}).map(function(examPaper) {  
				return examPaper._id;  
			  }); 
				
				
						totalStudent=0;
						if((exampaper.user).equals(answers.user)){
						
							Rank=index;
						}
						totalStudent++;


				graphDetails={
					totalStudent:totalStudent,
					usertotal:answers.total,
					examname:answers.examname,
					Rank:Rank+1
		
				}	
				lineCurve.push(graphDetails);
		
				answers.response.forEach((response)=>{
			
					if(response.subject==='math'  && response.marked===true){
						mathcount++;
					}
					if(response.subject==='math'){
						totalmath++;
					}
					if(response.subject==='chem' && response.marked===true){
					  chemcount++;
					  }
					  if(response.subject==='chem'){
						  totalchem++;
					  }
					  if(response.subject==='phy'&& response.marked===true){
						  phycount++;
					  }
					  if(response.subject==='phy'){
						  totalphy++;
					  }
				  
				});

		});
		console.log(examId);
		res.json({
		totalmath,
		mathcount,
		chemcount,
		totalchem,
		phycount,
		totalphy,
		// lineCurve

	}).then(()=>{});
			
		
		
			}catch(error){
			console.log(error);
			}
	
		
		
		});

	 router.get('/examranklist/:examid',Auth,async(req,res)=>{
	 	try{
		let total=0;
	 	let rank=0;
	 	let examid=req.params.examid;
	 	let answersheets = await ResponseModel.find({examid:examid}).sort({total:-1});
	 	res.json({
	 		answersheet
	 	});
	 
	 	}catch{
	 
		}
	 
	
	 });
	
	router.get('/ranklist/:examid',Auth,async(req,res)=>{
	 	try{
	
	 	let examid=req.params.examid;
	 
		let answersheets = await ResponseModel.find({examid:examid}).sort({total:-1});
	 	res.json(answersheets);
	
	 	}catch(err){
	 		console.log(err);
		}
	 
	 
	 });
	
	router.get('/attemptedexam/:userid', Auth, async (req, res) => {
	 	try {
	
	 		let userid = req.params.userid;
	 		let answersheets = await ResponseModel.find({user:userid},{total:1,examname:1,examid:1});
				
	 		res.json(answersheets);
	 
		} catch (err) {
	 		console.error(err.message);
			if (err.kind == 'ObjectId') res.status(400).json({ msg: ' noQuestiont found' });
	 
	 		res.status(500).send('Server Error');
	 	}
	});
	 
	 router.get('/calculation/:examid/:userid',Auth,async(req,res)=>{
	 
		try{
	 	
		let userid=req.params.userid;
	 	let examid=req.params.examid;
		
	 		let examsheet = await Exammodel.findById(req.params.examid);
	 		console.log(examsheet.attemptedstudent);
			// examsheet.attemptedstudent=[...examsheet.attemptedstudent,userid];
	 
	 	
	 
		await ResponseModel.find({examid:examid,user:userid}).then((userSheet) => {
	
			userSheet[0].status='Submitted';
	 
		
	 
			examsheet.sec.forEach((sec)=>{
	
				sec.question.forEach((allQue)=>{
	 
					userSheet[0].response.forEach((answered)=>{
	 					
						quesId=allQue._id;
	 	
			
	 					if(quesId.equals(answered._id) ){
										
										
	 									if(sec.subject==='math'){
					
										if (JSON.stringify(allQue.correct) === JSON.stringify(answered.mark)) {
	 							
										userSheet[0].correcttags.push(...allQue.tag);
	 									answered.marked = 1;
										answered.score = sec.positive;
	 									userSheet[0].math=answered.score+userSheet[0].math;
	 									userSheet[0].total = userSheet[0].total + sec.positive;
	 							
	 									} else {
	 							
										userSheet[0].wrongtags.push(...allQue.tag);
	 									answered.marked = 0;
										answered.score = -1 * sec.negative;
	 									userSheet[0].math=answered.score+userSheet[0].math;
	 									userSheet[0].total = userSheet[0].total - sec.negative;
	 									}
	 									}
	 									if(sec.subject==='chem'){
	 									if (JSON.stringify(allQue.correct) === JSON.stringify(answered.mark)) {
	 									userSheet[0].correcttags.push(...allQue.tag);
	 									answered.marked = 1;
	 									answered.score = sec.positive;
	 									userSheet[0].chemistry=answered.score+userSheet[0].chemistry;
	 									userSheet[0].total = userSheet[0].total + sec.positive;
	 									} else {
	 									userSheet[0].wrongtags.push(...allQue.tag);
	 									answered.marked = 0;
	 									answered.score = -1 * sec.negative;
	 									userSheet[0].chemistry=answered.score+userSheet[0].chemistry;
	 									userSheet[0].total = userSheet[0].total - sec.negative;
	 									}
	 									}
	 									if(sec.subject==='phy'){
	 									if (JSON.stringify(allQue.correct) === JSON.stringify(answered.mark)) {
	 							
	 									userSheet[0].correcttags.push(...allQue.tag);
	 									answered.marked = 1;
										answered.score = sec.positive;
	 									userSheet[0].physics=answered.score+userSheet[0].physics;
	 									userSheet[0].total = userSheet[0].total + sec.positive;
	 									} else {
	 							
	 									userSheet[0].wrongtags.push(...allQue.tag);
	 							
										answered.marked = 0;
	 									answered.score = -1 * sec.negative;
										userSheet[0].physics=answered.score+userSheet[0].physics;
	 									userSheet[0].total = userSheet[0].total - sec.negative;
	 									}
	 									}
	 	
	 									
	 								
						}
						else if((sec._id).equals(answered.secid) ){
					
	 						
	 				userSheet[0].unattempttags.push(...allQue.tag);
							
						}
	 			
					});
	 
					});
	 
	
	 				});
	
					userSheet[0].save();
	 				});
	
	 
	 	
	
		examsheet.save();
	
		res.json('hello');
	 	
	}catch(err){
	 console.log(err);
	}
	 
	 });
	 
	router.get('/analysisexam/:examid/:userid',Auth,async(req,res)=>{
	 	try{
			let userid=req.params.userid;
	 		let examid=req.params.examid;
	 		
	 		let total=0;
	 		let mathrank=1;
			let chemrank=1;
	 		let phyrank=1;
	 	
	 		let totalrank=1;
	 		let totalhigh=1;
			let mathavg=0;
	 		let mathhigh=0;
	 		let mathuser=0;
	 	
	 		let chemavg=0;
	 		let chemhigh=0;
			let chemuser=0;
	 	
	 		let phyavg=0;
	 		let phyhigh=0;
			let phyuser=0;
	 	
	 		let totalavg;
	 		let examsheet=await Exammodel.find({examid:examid});
		
	 			let usersheet=await ResponseModel.find({examid:examid,user:userid});
	 			
			
	 	
				let answersheets = await ResponseModel.find({examid:examid}).sort({total:-1}).then((answer) => {
		
					answer.forEach((answers) => {
	 					total++;
		
	 					if(answers.physics>phyhigh){
	 						phyhigh=answers.physics
						}
	 					if(answers.total>totalhigh){
	 						totalhigh=answers.total
	 					}
	 					if(answers.math>mathhigh){
	 						mathhigh=answers.math
	 					}
	 					if(answers.chemistry>chemhigh){
	 						chemhigh=answers.chemistry
	 					}
	 					if(answers.user.equals(userid)){
	 						console.log('heyyyy');
	 						if(answers.physics>phyhigh){
	 							phyrank++;
	 						}
	 						if(answers.math>mathhigh){
	 							mathrank++;
	 						}
	 						if(answers.chemistry>chemhigh){
	 							chemrank++;
	 						}
	 						mathuser=answers.math;
	 						chemuser=answers.chemistry;
	 						phyuser=answers.physics;
	 					}
	 					totalavg=answers.total+totalavg;
	 			
	 					mathavg=answers.math+mathavg;
	 			
						chemavg=answers.chemistry+chemavg;
	 			
						phyavg=answers.physics+phyavg;
	 				});
				  });
	 			   totalavg=totalavg/total;
	 			
	 			  mathavg=mathavg/total;
	 			  chemavg=chemavg/total;
				  phyavg=phyavg/total;
	 	  
	 		res.json({total,mathrank,chemrank,phyrank,totalhigh,totalrank,mathavg,mathhigh,mathuser,chemavg,chemhigh,chemuser,phyavg,phyhigh,phyuser,examsheet,usersheet});
	 	}catch(err){
		console.log(err);
	 	}
	 	
	 });
	 
	
	 router.post('/addpost', upload.fields([
		{
		name: 'queryimage', maxCount: 1
	 	},]
	   ),Auth, async (req, res) => {
	 	try {
	 		console.log(req.body);
	 		let queryImage;
	 		if(req.body.queryimage===''){
	 			queryImage = 'NoImage';
	 			
	 		}else{
	 			queryImage=req.files['queryimage'][0].filename
			}
	 		const userid = req.body.userid;
	 		const username = req.body.username;
	 		const query = req.body.query;
	 		const subject = req.body.subject;
	 		const avatar = req.body.avatar;
	 		let tag=req.body.Tags;
	 		tag=JSON. parse(tag);
	 		
	 		const newpost =  new postModel({
	 			avatar:avatar,
					id: userid,
	 				query:query,
	 				subject:subject,
	 				username:username,
	 				queryimage:queryImage,
	 				tags:tag
	 		});
	 		newpost.save();
	 		res.json(newpost);
	 	} catch (err) {
	 		console.error(err.message);
	 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'Try later' });
	 
	 		res.status(500).send('Server Error');
	 	}
	});
	 router.post('/deletepost', Auth, async (req, res) => {
	 	try {
	 		 await postModel.findByIdAndDelete(req.body.postid) 
	 		.catch(err => res.status(400).send(err.message));
	 		
	 		res.json(req.body.postid);
	 	}
		 catch (err) {
	 		console.error(err.message);
	 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });
	 
	 		res.status(500).send('Server Error');
	 	}
	});
	 router.post('/deletecomment', Auth, async (req, res) => {
	 	try {
	 		console.log(req.body);
	 		 const post =await postModel.findById(req.body.postid);
	 		 post.comment.id(req.body.commentid).remove();
	 	
	 		 post.save();
	 		
			res.json({postid:req.body.postid,commentid:req.body.commentid});
	 	}
		 catch (err) {
	 		console.error(err.message);
	 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });
	 
	 		res.status(500).send('Server Error');
	 	}
	});
	 router.get('/allpost', Auth, async (req, res) => {
	 	try {
	 		
	 		const allpost = await postModel.find().sort({postdate:-1});
	 		
			res.json(allpost);
	 	} catch (err) {
			console.error(err.message);
	 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'No exam found' });
	 
	 		res.status(500).send('Server Error');
	 	}
	});
	 
	 router.post('/addcomment', Auth, async (req, res) => {
	 	try {
		
	 		let username = req.body.username;
	 		let comment = req.body.comment;
			let postid = req.body.postid;
	 		let upvote = req.body.upvote;
	 		let avatar=req.body.avatar;
	 		let id=Date.now;
	 		let commentdetail;
	 
	 		const post = await  postModel.findById(postid);
	 
	
	 			if(upvote===0){
					commentdetail={
						avatar:avatar,
	 					username:username,
	 					userComment:comment,
	 					id:id
	 				}
	 				const newcomment=post.comment.unshift(commentdetail);
	 
	 				post.save();
	 				res.json({postid,commentdetail});
				}else{
	 				 post.upvote = [...post.upvote ,username];
	 				post.save();
	 				res.json({postid,postupvote:post.upvote});
	 				console.log(post.upvote);
	 			}
	 
	 	} catch (err) {
	 		console.error(err.message);
			if (err.kind == 'ObjectId') res.status(400).json({ msg: 'No exam found' });
	 
	 		res.status(500).send('Server Error');
	 	}
	});
	 
	 module.exports = router;
	  