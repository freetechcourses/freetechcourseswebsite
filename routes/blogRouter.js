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
		let date = new Date(timestamp);
		let [day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];
		let data = await Blog.find({});
		data = data.map(p => p.toObject());
		data = data.filter(p => {
			let check = new Date(p.date);
			return (check.getDate() === day && check.getMonth() === month && check.getFullYear() === year);
		});
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
		let input = cut(req.body, ['title','body','blogImage','date']);
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

router.put('/pin', async (req, res, next) => {
	try{
		let { list } = req.body;
		if(!Array.isArray(list)){
			let err = new Error('list of ids must be present');
			err.status = 400;
			next(err);
			return;
		}
		let updates = [
			Blog.updateMany({ _id: { $in: list }}, { pin: true }),
			Blog.updateMany({ _id: { $nin: list }}, { pin: false })
		];
		await Promise.all(updates);
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});

module.exports = router;
