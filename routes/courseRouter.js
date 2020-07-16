const express = require('express');
const router = express.Router();
const Course = require('../models/data');
const cut = require('../utilities/cut');
const auth = require('../utilities/auth');

router.get('/latest', async (req, res, next) => {
	try{
		let data = await Course.find({}, { __v: 0 }, { sort: {'date':-1}, limit: 6 });
		res.status(200).json({ ok:1, data });
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
		console.log(allKeywords);
		res.status(200).json({ ok: 1, allKeywords });
	} catch (err) { next(err) }
})

// router.get('/search')

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


module.exports = router;