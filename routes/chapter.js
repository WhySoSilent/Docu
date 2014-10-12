// Route : chapter
var db = require('../dbs/db');

// Ajax 更新指定id的chapter
exports.update = function(req, res){
  var id = req.params.id;
  var chapter = req.body;

  res.send({status: 'success'});
}

// Ajax 删除指定id的chapter
exports.delett = function(req, res){
  var id = req.params.id;

  res.send({status: 'success'});
}