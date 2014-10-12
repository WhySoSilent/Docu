// Route : member

exports.list = function(req, res){
  var id = req.params.id;
  if ( id === 'default' ) {
  	res.send([
		{ name: "Wang", mail: "ak.wang@me.com" },
		{ name: "Wei", mail: "weiLL@qq.com" },
		{ name: "Wu", mail: "haohuawu@gmail.com" },
		{ name: "Ye", mail: "YeZZQQ@qq.com" }
	]);
	return;
  }
  res.send([
		{ name: id, mail: "ak.wang@me.com" },
		{ name: id, mail: "weiLL@qq.com" },
		{ name: id, mail: "haohuawu@gmail.com" },
		{ name: id, mail: "YeZZQQ@qq.com" }
	]);

};