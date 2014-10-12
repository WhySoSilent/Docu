
/**
 * Module dependencies.
 */

var express = require('express');
// var mongoose = require('mongoose');
var db = require('./dbs/db');
var routes = require('./routes');
var project = require('./routes/project');
var doc = require('./routes/docNew');
var chapter = require('./routes/chapter');
var section = require('./routes/section');
var member = require('./routes/member');
var http = require('http');
var path = require('path');

var app = express();

// mongoose.connect('mongodb://localhost:27017/doc',function(err) {
// 	if(err) {
// 		console.log('连接不到 MongoDB');
// 	}
// });

// all environments
app.set('port', 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
// app.use() 是启用中间件
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/project/:id', routes.project);
app.get('/project/:id/doc/:docId', routes.doc);

// app.get('/p/:id/doc', doc.list);
// app.get('/p/:id/member', member.list);

app.get('/p/:id', project.detail);
app.get('/p/:id/d/:docId', doc.detail);
app.post('/p/:id/d/:docId/c', doc.create);

app.post('/c/:id', chapter.update);
app.post('/c/:id/delete', chapter.delett);
app.post('/s/:id', section.update);
app.post('/s/:id/delete', section.delett);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
