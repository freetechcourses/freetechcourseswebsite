const express = require('express');
const router = express.Router();
const Course = require('../models/data');
const cut = require('../utilities/cut');
const auth = require('../utilities/auth');

router.get('/latest', async (req, res, next) => {
	try{
		let { page } = req.query;
		if(!page) page = 0;
		if(typeof page === 'string') page = parseInt(page);
		let data = await Course.find({}, { __v: 0 }, { sort: {'date':-1}, skip: (page * 6), limit: 6 });
		let output = { ok:1, data };
		output.page = page;
		output.nextPage = data.length === 6 ? page + 1 : false;
		res.status(200).json(output);
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
		let data = await Course.find({
			keywords: { $in: keywords }
		});
		let langs = new Set();
		data.forEach(doc => {
			doc.languages.forEach(l => langs.add(l));
		});
		langs = Array.from(langs);
		res.status(200).json({ ok:1, data, langs });
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
		let updates = cut(req.body, ['name','description','courseImage','hyperlink','date','languages','keywords']);
		let out = await Course.updateOne({ _id: req.params.id }, { $set: updates });
		if(out.n !== 1 || out.nModified !== 1){
			let err = new Error('Update failed');
			next(err);
			return;
		}
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); console.log(err) }
});


router.delete('/delete', async (req, res, next) => {
	try{
		let { list } = req.body;
		if(!Array.isArray(list)){
			let err = new Error('list must be an array');
			err.status = 400;
			next(err);
			return;
		}
		if(list.length === 0){
			let err = new Error('Empty list');
			err.status = 400;
			next(err);
			return;
		}
		await Course.deleteMany({ _id: { $in: list }});
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});

module.exports = router;