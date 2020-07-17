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


router.delete('/:id', async (req, res, next) => {
	try{
		let { deletedCount } = await Course.deleteOne({ _id: req.params.id });
		if(deletedCount !== 1){
			let err = new Error('Could not delete');
			next(err);
			return;
		}
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});

module.exports = router;