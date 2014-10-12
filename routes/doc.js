var dbModel = require('../dbs/mongoose');
//获取文档集合
exports.chapterlist = function(req, res){
	var Chapter = dbModel.Chapter;
	Chapter.find(function(err,docs) {
		if(err) {
			console.log("ERROR for get collection of chapters");
		} else {
			res.send(docs);
		}
	});
  // res.send([{title:'test',describe:'测试',code:{type:'js',content:'测试'}},{title:'test',describe:'测试',code:{type:'js',content:'测试'}}]);
};

//获取特定文档章节
exports.getChapter = function(req, res){
	var id = req.params.id;
	Chapter.findOne({id:id},function(err,docs) {
		if(err) {
			console.log("ERROR for get chapter of id: " + id);
		} else {
			res.send(docs);
		}
	});
};

//更新 chapter
exports.updateChapter = function(req, res){
	var id = req.params.id;
	var Chapter = dbModel.Chapter;
	var chapter = new Chapter(req.body);
	Chapter.update({id:id}, {$set: {title:chapter.title,describe:chapter.describe,code:chapter.code}}, function(err,num){
		if(err) {
			res.send({status: 'faild'});
			console.log("ERROR for update chapter : " + id);
		} else {
			res.send({status: 'success'});
		}
	});
};

//保存新的 chapter
exports.newChapter = function(req, res){
	var Chapter = dbModel.Chapter;
	// var chapter = new Chapter(req.body);
	var chapter =  req.body;
	Chapter.create(chapter,function(err,doc) {
		if(err) {
			console.log("ERROR to create new chapter into db");
			res.send({status: 'faild'});
		} else {
			// console.log(doc);
			res.send({status:'success',id:doc.id});
		}
		
	});
	// chapter.save(function(err) {
	// 	if (err) {
	// 		console.log('存储数据出错了');
	// 		res.send({status: 'faild'});
	// 	} else {
	// 		console.log('新chapter保存成功');
	// 		res.send({status: 'success'});
	// 	}
	// });
}

//删除某 chapter
exports.deleteChapter = function(req, res){
	var id = req.params.id;
	var Chapter = dbModel.Chapter;
	Chapter.remove({id: id},function(err) {
		if(err) {
			console.log('删除chapter出错了');
			res.send({status: 'faild'});
		} else {
			console.log('删除chapter');
			res.send({status:'success'});
		}
	});
};