const mongoose = require('mongoose');
const list = {
	"local": "mongodb://127.0.0.1:27017/cdata",
	"docker": "mongodb://mongo:27017/cdata",
	"online": process.env.MONGOURL
};

module.exports = async context => {
	try{
		
		await mongoose.connect(list[context], { useNewUrlParser:true, useUnifiedTopology:true });
		console.log("Connected to Database");
	} catch(err){
		console.log("DATABASE CONNECTION ERROR");
		process.exit(0);
	}
}