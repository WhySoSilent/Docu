// Route : main page

exports.index = function(req, res){
  res.render('index', {});
};

exports.project = function(req, res){
  res.render('project', {});
};

exports.doc = function(req, res){
  var projectId = req.params.id;
  var docId = req.params.docId;

  res.render('doc', {});
};