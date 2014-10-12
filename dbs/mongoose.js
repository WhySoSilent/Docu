var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		db = mongoose.createConnection('localhost', 'doc'),
		autoinc = require('mongoose-id-autoinc');
		//自增id插件参考 https://github.com/mariodu/mongoose-id-autoinc

autoinc.init(db);

var ChapterSchema = new Schema({
	// id: {
	// 	type: Schema.Types.ObjectId,
	// 	default: new mongoose.Types.ObjectId
	// 	//'new mongoose.Types.ObjectId' is only called on initialize of Schema.
	// },
	title: String,
	describe: String,
	code: String
});

ChapterSchema.plugin(autoinc.plugin, { model: 'Chapter', field:'id', start: 100});

exports.Chapter = mongoose.model('Chapter',ChapterSchema);