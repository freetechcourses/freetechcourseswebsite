const express = require('express');
const bodyparser = require('body-parser');
const log = require('morgan');
const app = express();

const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');
const contactRouter = require('./routes/contactRouter');
const blogRouter = require('./routes/blogRouter');

const context = process.argv[2] || "local";
require('./dbconfig/connect')(context);
require('dotenv').config();

app.use(log('dev'));
app.use(bodyparser.json());

// Serving Static Admin and Public folder 
app.use(express.static('admin'));
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.redirect('/login.html');
})

// Allow Cross-Origin-Requests
app.use((req, res, next) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', '*');
	res.set('Access-Control-Allow-Methods', '*');
	if (req.method === 'OPTIONS') {
		res.status(200).end();
		return;
	}
	res.set('Content-Type', 'application/json');
	next();
});


app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/contact', contactRouter);
app.use('/blog', blogRouter);

// Handling undefined routes
app.use((req, res, next) => {
	res.redirect('/err404.html');
});

// Final error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500)
		.json({
			error: err.message
		});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
