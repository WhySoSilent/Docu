// Route : project

exports.detail = function(req, res){
  var id = req.params.id;

  var test = {
  	id: id,
  	name: '(DOD) Docs Of Docu',
  	public: true,
  	// synergic: false,
  	docs: [
			{ id: 'QW23ER', name: "Design doc", public: true, synergic: false },
			{ id: 'QW23ER', name: "API doc", public: true, synergic: false },
			{ id: 'QW23ER', name: "Dev doc", public: true, synergic: false }
		],
		members: [
			{ name: "Wang", mail: "ak.wang@me.com" },
			{ name: "Wei", mail: "weiLL@qq.com" },
			{ name: "Wu", mail: "haohuawu@gmail.com" },
			{ name: "Ye", mail: "YeZZQQ@qq.com" }
		]
  }
  res.send(test);

};