const mongoose = require('mongoose');
require('dotenv').config();
const list = {
	"local": "mongodb://127.0.0.1:27017/cdata",
	"docker": "mongodb://mongo:27017/cdata",
	"online": process.env.MONGOURL
};

module.exports = async context => {
	try{
		await mongoose.connect(list[context], { useNewUrlParser:true, useUnifiedTopology:true });
		console.log("Connected to Database");
		return;
	} catch(err){
		console.log("DATABASE CONNECTION ERROR");
		console.log(err);
		process.exit(0);
	}
}