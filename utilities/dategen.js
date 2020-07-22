function dategen() {
	let d = new Date();
	return new Date((""+d.getFullYear())+"-"+((""+d.getMonth()).length==2?""+d.getMonth():"0"+d.getMonth())+"-"+((""+d.getDate()).length==2?""+d.getDate():"0"+d.getDate())).getTime();
};

if(require.main === module) console.log(dategen());