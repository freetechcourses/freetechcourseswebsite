const express = require('express');
const router = express.Router();
const Course = require('../models/data');
const cut = require('../utilities/cut');
const auth = require('../utilities/auth');

router.get('/latest', async (req, res, next) => {
	try{
		let page = req.query.page || 0
		let data = await Course.find({}, { __v: 0 }, { sort: {'date':-1}, skip: (page * 6), limit: 6 });
		let [{ total }] = await Course.aggregate([{ $group: { _id: null, "total": { $sum:1 }}}]);
		res.status(200).json({ ok:1, data, total });
	} catch(err){ next(err); }
});


router.get('/single/:id', async (req, res, next) => {
	try{
		let data = await Course.findOne({ _id: req.params.id });
		res.status(200).json({ ok:1, data });
	} catch(err){ next(err); }
});

router.get('/keywords', async (req, res, next) => {
	try {
		let [{ allKeywords }] = await Course.aggregate([{ $unwind: "$keywords" }, { $group: { _id: null, allKeywords: { $addToSet: "$keywords" } } }]);
		res.status(200).json({ ok: 1, allKeywords });
	} catch (err) { next(err) }
});

router.get('/languages', async (req, res, next) => {
	try {
		let [{ allLanguages }] = await Course.aggregate([{ $unwind: "$languages" }, { $group: { _id: null, allLanguages: { $addToSet: "$languages" } } }]);
		res.status(200).json({ ok: 1, allLanguages });
	} catch (err) { next(err) }
});

router.post('/search', async (req, res, next) => {
	try{
		let { keywords } = req.body;
		let data = await Course.aggregate([
			{ $match: { keywords: { $in: keywords }}},
			{ $unwind: "$languages" },
			{ $group: {
				_id: "$languages",
				"courses": { $push: "$$ROOT" },
				"count": { $sum: 1 }
			}}
		]);
		let combined = [];
		data.forEach(part => {
			part.courses.forEach(c => {
				if(combined.find(e => e._id === c._id) === undefined) combined.push(c);
			});
		});
		res.status(200).json({ ok:1, data, combined });
	} catch(err){ next(err); }
});

router.use(auth);

router.post('/add', async (req, res, next) => {
	try{
		let newdata = new Course( req.body );
		await newdata.save();
		res.status(200).json({ ok:1 });
	} catch(err){ err.status = 400; next(err); }
});


router.patch('/update/:id', async (req, res, next) => {
	try{
		let updates = cut(req.body, ['name','description','courseImage','hyperlink',])
		let out = await Course.updateOne({ _id: req.params.id }, updates);
		if(out.n !== 1 || out.nModified !== 1){
			let err = new Error('Update failed');
			next(err);
			return;
		}
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});


router.delete('/delete/:id', async (req, res, next) => {
	try{
		let out = await Course.deleteOne({ _id: req.params.id });
		if(out.deletedCount !== 1){
			let err = new Error('Delete failed');
			next(err);
			return;
		}
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});


router.get('/date/:date', async (req, res, next) => {
	try{
		let data = await Course.find({ date: (new Date(req.params.date)).getTime() });
		res.status(200).json({ ok:1, data });
	} catch(err){ next(err); }
});


module.exports = router;