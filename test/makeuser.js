const User = require('../models/user');
const bcrypt = require('bcrypt');

const context = process.argv[2] || "local";
require('../dbconfig/connect')(context);



(async () => {
	let passhash = await bcrypt.hash('admin', 10);
	await User.replaceOne(
		{ email: 'admin@admin.com' },
		{ email: 'admin@admin.com', passhash },
		{ upsert: true }
	);
	console.log('done');
	process.exit(0);
})();