// module : 数据库连接对象
var mongodb = require('mongodb');
var config = require('./dbConfig');
	
var server = new mongodb.Server(
	config.url,
	config.port, 
	{
		auto_reconnect : true ,
		poolSize : config.poolSize
	}
);
var db = new mongodb.Db(config.dbName, server);

var objs = {}

// 连接数据库
db.open(function(err, client) {
	if (err) {
		console.log('\033[96m MongoDB连接出错! \033[39m ');
		throw err;
	}
	console.log('\033[96m 连接到MongoDB数据库 \033[39m');
	// 建立集合的快捷方式
	objs.users = new mongodb.Collection(client, 'users');
	objs.projects = new mongodb.Collection(client, 'projects');
	objs.docs = new mongodb.Collection(client, 'docs');
	objs.chapters = new mongodb.Collection(client, 'chapters');
	objs.sections = new mongodb.Collection(client, 'sections');
});

module.exports = objs;