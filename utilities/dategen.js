function dategen() {
	let d = new Date();
	return new Date((""+d.getFullYear())+"-"+((d.getMonth()+1+"").length==2?d.getMonth()+1+"":"0"+(d.getMonth()+1))+"-"+((""+d.getDate()).length==2?""+d.getDate():"0"+d.getDate())).getTime();
};

if(require.main === module) console.log(dategen());

module.exports = dategen;