const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const cut = require('../utilities/cut');
const auth = require('../utilities/auth');

router.get('/latest', async (req, res, next) => {
	try{
		let data = await Blog.find({}, { __v:0 }, { sort: { 'date':-1 }});
		res.status(200).json({ ok:1, data });
	} catch(err){ next(err); }
});

router.get('/bydate/:timestamp', async (req, res, next) => {
	try{
		let { timestamp } = req.params;
		if(!timestamp){
			let err = new Error('Date required');
			err.status = 400;
			next(err);
			return;
		}
		if(typeof timestamp === 'string') timestamp = parseInt(timestamp);
		let day = new Date(timestamp).getDate();
		let data = await Blog.find({});
		data = data.map(p => p.toObject());
		data = data.filter(p => new Date(p.date).getDate() === day);
		res.status(200).json({ ok:1, data });
	} catch(err){ next(err); }
});

router.get('/single/:id', async (req, res, next) => {
	try{
		let data = await Blog.findOne({ _id:req.params.id });
		res.status(200).json({ ok:1, data });
	} catch(err){ next(err); }
});

router.get('/alldates', async (req, res, next) => {
	try{
		let [{ allDates }] = await Blog.aggregate([{ $group: { _id:null, allDates: { $addToSet: "$date" }}}]);
		res.status(200).json({ ok:1, allDates });
	} catch(err){ next(err); }
});

router.use(auth);

router.post('/add', async (req, res, next) => {
	try{
		let input = cut(req.body, ['title','body','blogImage']);
		input.date = Date.now();
		let newblog = new Blog(input);
		await newblog.save();
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});

router.delete('/delete/:_id', async (req, res, next) => {
	try{
		let { _id } = req.params;
		let { deletedCount } = await Blog.deleteOne({ _id });
		if(deletedCount !== 1){
			let err	= new Error('Could not delete blog');
			next(err);
			return;
		}
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});

module.exports = router;