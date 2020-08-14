const mongoose = require('mongoose');
const connectDB = async () => {
	try {
		await mongoose.connect('mongodb+srv://Abhay:Abh@yj@1n@cluster0.lsmbe.mongodb.net/test', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		console.log('Mongoo Db connected..');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};
module.exports = connectDB;
