const express = require('express');
const bodyparser = require('body-parser');
const log = require('morgan');
const app = express();
const mongoose = require("mongoose");


const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');

mongoose.connect(
	"mongodb+srv://freetechcouses:" +
	process.env.MONGO_ATLAS_PW +
	"@cluster0.hcs8o.mongodb.net/<dbname>?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
mongoose.Promise = global.Promise;

const context = process.argv[2] || "local";
require('./dbconfig/connect')(context);

app.use(log('dev'));
app.use(bodyparser.json());

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

// Serving Static Admin and Public folder 
app.use(express.static('admin'));
app.use(express.static('public'));

app.use('/user', userRouter);
app.use('/data', courseRouter)

// Handling undefined routes
app.use((req, res, next) => {
	let err = new Error('undefined route');
	err.status = 404;
	next(err);
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