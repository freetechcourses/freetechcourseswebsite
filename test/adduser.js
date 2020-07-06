const User = require('../models/user');
const bcrypt = require('bcrypt');

const context = process.argv[2] || "local";

let email;
let state = 0;

process.stdin.on('data', async data => {
	data = data.toString().trim();
	if(state === 0){
		email = data;
		state++;
		console.log("Enter password:");
	} else if(state === 1){
		let passhash = await bcrypt.hash(data, 10);
		let newUser = new User({ email, passhash });
		await newUser.save();
		console.log('done');
		process.exit(0);
	}
});

async function main(){
	await (require('../dbconfig/connect')(context));
	console.log("Enter email:");
}

main();