// Route : section

// Ajax 更新指定id的section
exports.update = function(req, res){
  var id = req.params.id;
  var section = req.body;

  res.send({status: 'success'});
}

// Ajax 删除指定id的section
exports.delett = function(req, res){
  var id = req.params.id;

  res.send({status: 'success'});
}