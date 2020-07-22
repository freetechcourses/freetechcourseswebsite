const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const auth = require('../utilities/auth');

router.post('/newcontact', async (req, res, next) => {
    try {
        let contactData = new Contact(req.body);
        await contactData.save();
        res.status(200).json({ ok: 1 });
    } catch (err) { err.status = 400; next(err); }
});

router.use(auth);


router.get('/all', async (req, res, next) => {
	try{
		let feedbacks = await Contact.find({});
		res.status(200).json({ ok:1, feedbacks });
	} catch(err){ next(err); }
});


router.delete('/delete', async (req, res, next) => {
	try {
		let { list } = req.body;
		if (!Array.isArray(list)) {
			let err = new Error('list must be an array');
			err.status = 400;
			next(err);
			return;
		}
		if (list.length === 0) {
			let err = new Error('Empty list');
			err.status = 400;
			next(err);
			return;
		}
		await Contact.deleteMany({ _id: { $in: list } });
		res.status(200).json({ ok: 1 });
	} catch (err) { next(err); }
});

module.exports = router;