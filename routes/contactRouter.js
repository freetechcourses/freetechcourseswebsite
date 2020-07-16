const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/newcontact', async (req, res, next) => {
    try {
        let contactData = new Contact(req.body);
        await contactData.save();
        res.status(200).json({ ok: 1 });
    } catch (err) { err.status = 400; next(err); }
});

module.exports = router;