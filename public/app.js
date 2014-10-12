$(function() {
//---------------------------- Model --------------------------
var CodeSection = Backbone.Model.extend({
	defaults: {
		title: "标题所在",
		describe: "描述你的代码",
		code: "//code here..."
	}
});
//---------------------------- Collection --------------------------
var CodeSectionList = Backbone.Collection.extend({
	model: CodeSection,
	// localStorage: new Backbone.LocalStorage("CodeSection")
	url: "/chapter"
});

var codes = new CodeSectionList;

//----------------------------- Controller -------------------------
var CodeSectionView = Backbone.View.extend({
	tagName: "li",
	template: $("#item-code").html(),
	initialize: function() {
		//绑定事件
		this.listenTo(this.model,"change",this.render);
		this.listenTo(this.model,"destroy",this.remove);
		//dom缓存

	},
	events: {
		"dblclick .aEditSection":"edit",
		"blur .input": "close",
		"click .clear": "clear"
	},
	render: function() {
		var output = Mustache.render(this.template,this.model.toJSON());
		this.$el.html(output);
		//这里缓存...
		//alert(this.$el.$(".titInput").val());
		return this;
	},
	edit: function() {
		this.$el.find(".aEditSection").addClass("editing");	//.$(".aEditSection")
		//this.$el.focus();	//$(".codeInput").
		this.$el.find(".titInput").val(this.model.get("title"));
		this.$el.find(".desInput").val(this.model.get("describe"));
		this.$el.find(".codeInput").val(this.model.get("code"));
		tabIndent.render(this.$el.find(".desInput")[0]);
		tabIndent.render(this.$el.find(".codeInput")[0]);
	},
	close: function() {
		//退出修改状态
		this.$el.find(".aEditSection").removeClass("editing");

		var title = this.$el.find(".titInput").val();
		var describe = this.$el.find(".desInput").val();
		var code = this.$el.find(".codeInput").val();

		this.model.save({title: title,describe: describe,code:code});
	},
	clear: function() {
		if(confirm('删除不可逆！确认吗？')) {
			this.model.destroy();
		}
	}

});

var TitleView = Backbone.View.extend({
	tagName: "li",
	template: $("#item-title").html(),
	events: {

	},
	initialize: function() {
		this.listenTo(this.model,"change",this.render);
		this.listenTo(this.model,"destroy",this.remove);

	},
	render: function() {
		var output = Mustache.render(this.template,this.model.toJSON());
		this.$el.html(output);
		return this;
	}

});

var AppView = Backbone.View.extend({
	el: $("#app"),
	initialize: function() {
		this.listenTo(codes,"add",this.addOne);
		this.listenTo(codes,"reset",this.addAll);
		this.listenTo(codes,"all",this.render);

		this.viewBox = this.$("#sectionList");
		this.titleBox = this.$("#titleList");
		this.newOneTitle = this.$("#newOneTitle");
		this.newOneDesc = this.$("#newOneDesc");
		this.newOneCode = this.$("#newOneCode");

		codes.fetch();
	},
	events: {
		"click #createNew":"createNewOne"
	},
	addOne: function(code) {
		var view = new CodeSectionView({model: code});
		this.viewBox.append(view.render().el);

		var titleView = new TitleView({model: code});
		this.titleBox.append(titleView.render().el);
	},
	addAll: function() {
		codes.each(function(code){
			this.addOne(code);
		});
	},
	render: function() {
		prettyPrint();
	},
	createNewOne: function() {
		var title = this.newOneTitle.val();
		var describe = this.newOneDesc.val();
		var code = this.newOneCode.val();

		codes.create({title:title,describe:describe,code:code});
		this.newOneTitle.val('');
		this.newOneDesc.val('');
		this.newOneCode.val('');
	}
});

var App = new AppView;
});