const jwt = require('jsonwebtoken');
const { JWTKEY } = require('./env');
const b64toa = require('./btoa');

module.exports = async (req,res,next) => {
	try{
		let { token } = req.headers;
		let { alg } = JSON.parse(b64toa(token.split(".")[0]));
		if(alg !== "HS256"){
			let err = new Error('Invalid token');
			err.status = 401;
			next(err);
			return;
		}
		let out = await jwt.verify(token, JWTKEY);
		req.email = out.email;
		next();
	} catch(err){
		err = new Error('Invalid token');
		err.status = 401;
		next(err);
	}
}
