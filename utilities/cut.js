module.exports = function(input, props){
	let obj = {};
	for(let key of props){
		if(input[key]) obj[key] = input[key];
	}
	return obj;
}