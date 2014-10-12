// Route : doc
var db = require('../dbs/db');

exports.list = function(req, res){
  var id = req.params.id;
  if ( id === 'default' ) {
  	res.send([
		{ id: 'QW23ER', name: "Design doc", public: true, synergic: false },
		{ id: 'QW23ER', name: "API doc", public: true, synergic: false },
		{ id: 'QW23ER', name: "Dev doc", public: true, synergic: false }
	]);
	return;
  }
  res.send([
		{ id: 'QW23ER', name: id + "doc", public: true, synergic: false },
		{ id: 'QW23ER', name: id + "doc", public: true, synergic: false },
		{ id: 'QW23ER', name: id + "doc", public: true, synergic: false }
	]);

};

exports.detail = function(req, res){
	var id = req.params.id;
	var docId = req.params.docId;

	var test = {
		id: docId,
		name: 'Doc of Design',
		public: true,
		synergic: false,
		chapters: [{
			title: 'Chapter one',
			id: 'QW23ER1',
			sections: [{
				id: 'QW23ET1',
				label: 'about design',
				type: 'text',
				content: 'HeHeHeHe'
			},
			{
				id: 'QW23ET2',
				label: 'about UI',
				type: 'image',
				content: 'test.jpg'
			},
			{
				id: 'QW23ET3',
				label: 'about code',
				type: 'code',
				content: 'var doc = new Docu()'
			}] 
		},
		{
			title: 'Chapter two',
			id: 'QW23ER2',
			sections: [{
				id: 'QW23ET4',
				label: 'about design 2',
				type: 'text',
				content: 'HeHeHeHe'
			},
			{
				id: 'QW23ET5',
				label: 'about UI 2',
				type: 'image',
				content: 'test.jpg'
			},
			{
				id: 'QW23ET6',
				label: 'about code 2',
				type: 'code',
				content: 'var doc = new Docu()'
			}] 
		}]
	};
	res.send(test);
	// db.users.find({}).toArray(function(err,doc ) {
	// 	console.log(doc);
	// 	if (err ) return next(err);
	// 	res.send(doc);
	// });
}

exports.create = function(req, res){
	var id = req.params.id;
	var docId = req.params.docId;
	var newChapter = req.body;
	delete newChapter.id;
	newChapter.created = new Date();

	db.chapters.insert(newChapter, function(err, docs) {
		if(err) {
			res.send('error');
			return;
		}
		// ... 写返回状态，header才是正道
		// res.send(docs[0]._id.toString());
		res.send(docs[0]);

	})
	// console.log(newChapter);
	// 插入数据库
	res.send('xxxxxx');
}
