var data = {
	meta: {
		name : 'docName',
		id: '____'
	},
	content: [
		{ t: 'text', c: "This is a example document." },
		{ t: 'h1', c: "Main" },
		{ t: 'text', c: "the main content of this doc, is Javascript code." },
		{ t: 'h2', c: "Example:" },
		{ t: 'text', c: "how to define a function in js" },
		{ t: 'code', c: "function() { console.log('Hello World!'); }" },
		{ t: 'h2', c: "Result:" },
		{ t: 'img', c: "example.jpg" }
]};

var viewer = document.getElementById('viewer');
function toEditStatus() {
	$(viewer).attr('contenteditable', true);
	var editor = new MediumEditor('#viewer');

}
function save() {
	// 1. 解析
	// 2. 更新
}
// init
(function() {
	document.getElementById('toEdit').onclick = function() {
		toEditStatus();
		return false;
	}
	document.getElementById('toSave').onclick = function() {
		save();
		return false;
	}

})();

var initDom = new EJS({element: "temp_view"}).render(data);
$("#viewer").append(initDom);

// var editor = new MediumEditor('#viewer');
// var viewer = document.getElementById('viewer');
// var e = {};
// viewer.addEventListener('mouseup', function() {
// 	e.s = window.getSelection();
// 	e.r = e.s.getRangeAt(0);
// 	console.log(e.r);
// 	document.execCommand('bold');
// },false);