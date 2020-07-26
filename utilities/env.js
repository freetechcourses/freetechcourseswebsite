require('dotenv').config();
module.exports = {
	MONGOURL: process.env.MONGOURL,
	JWTKEY: process.env.JWTKEY,
	EMAIL: process.env.EMAIL,
	PASSWORD: process.env.PASSWORD
};

if(require.main === module){
	console.log(module.exports);
}