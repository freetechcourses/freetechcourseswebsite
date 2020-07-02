const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const key = require('../utilities/key');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const nodemailer = require('nodemailer');
const baseurl = require('../utilities/baseurl');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ole9@ethereal.email',
        pass: '139gy879C2cKgpJy8d'
    }
});

const router = express.Router();

router.post('/login', async (req,res,next) => {
	try{
		let { email, password } = req.body;
		let login = await User.findOne({ email });
		let match = await bcrypt.compare(password, login.passhash);
		if(!match){
			let err = new Error('Invalid Credentials');
			err.status = 401;
			next(err);
			return;
		}
		let token = jwt.sign({ email }, key);
		res.status(200).json({ ok:1, token });
	} catch(err){ next(err); }
});


router.post('/forgotpassword', async (req,res,next) => {
	try{
		let { email } = req.body;
		let resetToken = jwt.sign({ email }, key, { expiresIn: 60*60 });
		let output = await User.updateOne({ email }, { resetToken });
		if(output.nModified !== 1){
			let err = new Error('Email not found');
			err.status = 404;
			next(err);
			return;
		}
		res.status(200).json({ ok:1 });
		let sentMail = await transporter.sendMail({
			from: 'no-reply-server@freetechcourses.com',
			to: email,
			subject: 'Password reset request',
			text: `Recently a password reset request was made for the account linked to this email.\nClick on the link provided below to reset your password:\n\n${baseurl}/resetpassword?resetToken=${resetToken} \n\nThis link is valid only for 60 minutes.\nPlease ignore this email if you were not the one inititating the password reset request.`
		});
	} catch(err){ next(err); }
});


router.get('/resetpassword', async (req,res,next) => {
	try{
		let { resetToken } = req.query;
		let { alg } = JSON.parse(b64toa(resetToken.split(".")[0]));
		if(alg !== "HS256"){
			let err = new Error('Invalid token');
			err.status = 401;
			next(err);
			return;
		}
		await jwt.verify(resetToken, key);
		// put a res.redirect here
	} catch(err){ next(err); }
});


router.post('/changepassword', async (req,res,next) => {
	try{
		let { resetToken, newpass } = req.body;
		let passhash = await bcrypt.hash(newpass, 10);
		let output = await User.updateOne({ resetToken }, { passhash });
		if(output.n !== 1){
			let err = new Error();
			next(err);
			return;
		}
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});

module.exports = router;