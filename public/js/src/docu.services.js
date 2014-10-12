var services = angular.module('docu.services', []);

services.factory('Project', ['$http', 'Location', function($http, Location) {
	var Project = {};
	Project.data = null;

	Project.getDetail = function(scope) {
		$http.get('/p/' + Location.projectId ).success(function(data, status, headers) {
			scope.project = data;
			Project.data = data;
		});
	}
	Project.addNewProject = function(newOne) {
		//...
	}

	// $http.get('/p/' + Location.projectId ).success(function(data, status, headers) {
 //      for(var i = 0, len = data.length; i < len; i++ ) {
 //      	// Project.data.push(data[i]);
 //      }
 //  });

	// $http.get('/p/' + Location.projectId + '/doc').success(function(data, status, headers) {
 //      for(var i = 0, len = data.length; i < len; i++ ) {
 //      	Project.data.docs.push(data[i]);
 //      }
 //  });

	// $http.get('/p/' + Location.projectId + '/member').success(function(data, status, headers) {
 //      for(var i = 0, len = data.length; i < len; i++ ) {
 //      	Project.data.team.push(data[i]);
 //      }
 //  });

	return Project;
}]);

services.factory('Doc', ['$http', 'Location', 'Notice', function($http, Location, Notice) {
	var Doc = {
		tempId: null
	};
	var localTempIdCounter = 0;

	Doc.newTempId = function() {
		localTempIdCounter = localTempIdCounter + 1;
		Doc.tempId = "tempId" + localTempIdCounter;
		return Doc.tempId;

	}
	Doc.addNewChapter = function() {
		var newChapter = {
			id: Doc.newTempId(),
			title: prompt("Name this new chapter", 'Input new title here ...')
		}
		// featch database id
		function featchId(obj) {
			$http.post('/p/' + Location.projectId + '/d/' + Location.docId + '/c', obj).success(function(data, status, headers) {
				console.log(headers());
				obj.id = data;
			});
		};
		featchId(newChapter);

		Doc.data.chapters.push(newChapter);
		// ... 怎么调用这个新对象的编辑状态？？？
	}
	Doc.addNewSection = function(forChapter) {
		var newSection = {
			id: Doc.newTempId(),
			label: prompt("Name this new section", 'Input new label here ...'),
			type: 'text',
			content: 'content here ...'
		}
		forChapter.sections.push(newSection);
		// ... 怎么调用这个新对象的编辑状态？？？
	}
	// 异步获取数据
	Doc.getDetail = function(scope) {
		$http.get('/p/' + Location.projectId + '/d/' + Location.docId ).success(function(data, status, headers) {
				scope.doc = data;
				Doc.data = data;
		});
		// ... 失败了怎么办
	}
	// 更新数据
	Doc.update = function(obj) {
		var id = obj.id;
		Notice.notice('Updating...');
		if ( obj.sections ) {
			var send = { title: obj.title };
			$http.post('/c/' + id, send ).success(function(data, status, headers) {
				Notice.notice('Updated!');
			});
		} else {
			var send = { label: obj.label, type: obj.type, content: obj.content };
			$http.post('/s/' + id, send ).success(function(data, status, headers) {
				Notice.notice('Updated!');
			});
		}
	}
	// 删除数据
	Doc.delett = function(obj) {
		var id = obj.id;
		Notice.notice('Updating...');
		if ( obj.sections ) {
			$http.post('/c/' + id + '/delete').success(function(data, status, headers) {
				Notice.notice('Updated!');
			});
		} else {
			$http.post('/s/' + id + '/delete').success(function(data, status, headers) {
				Notice.notice('Updated!');
			});
		}
	}

	return Doc;
}]);

services.factory('Member', ['$http', 'Location', function($http, Location) {
	var Member = {
		list: []
	};

	Member.addNewMember = function(newOne) {
		//...
	}

	return Member;
}]);

services.factory('EditStatus', [function() {
	var Status = {
		rightOut: false,
		editing: null
	};
	// 激活右侧面板
	Status.setRightOut = function() {
		Status.rightOut = true;
	}
	// 设置正在编辑的对象
	Status.setEdit = function(witch) {
		Status.setRightOut();
		Status.editing = witch;
	}
	// 
	Status.exitEdit = function() {
		Status.rightOut = false;
		Status.editing = null;
	}
	// 查询是否有正在编辑的对象
	Status.anythingEditing = function() {
		if ( Status.editing )
			return true;
		return false;
	}
	// 保存编辑
	Status.save = function() {
		// 1. 调用编辑对象的保存方法
		// 2. 保存成功退出编辑面板
		Status.editing.save();
	}
	// 退出编辑
	Status.exit = function() {
		// 0. 是否抛弃现有更改，这个是在这里检查并提示吗？
		// 1. 调用编辑对象的退出方法
		// 2. 退出编辑面板
		Status.editing.exit();
		// if( !confirm('Are you sure Exit with none changed save!')) return;
	}
	// 删除正在编辑的
	Status.delett = function() {
		// 1. 确认删除动作
		// 2. 调用编辑对象的删除方法
		// 3. 退出编辑面板
		Status.editing.delett();
	}

	return Status;
}]);

services.factory('Notice', ['$timeout', function($timeout) {
	var Notice = {
		show: false,
		info: '',
		timmer: null
	}

	Notice.notice = function(str) {
		Notice.show = true;
		Notice.info = str;
		Notice.setClear();
	}

	Notice.setClear = function() {
		// 设定自动清除
		if ( Notice.timmer )
			$timeout.cancel( Notice.timmer );
		Notice.timmer = $timeout(Notice.clear, 2000);
	}

	Notice.clear = function() {
		Notice.show = false;
		Notice.info = '';
	}
	return Notice;
}]);

services.factory('Location', [function() {
	var Location = {
		url: document.URL,
		projectId: projectId(),
		docId: docId()
	};

	function projectId() {
		var s = /\/project\/(\w+)/;
		if ( s.test( document.URL ) ) {
			var id = RegExp.$1;
			return id;
		}
	}

	function docId() {
		var s = /\/doc\/(\w+)/;
		if ( s.test( document.URL ) ) {
			var id = RegExp.$1;
			return id;
		}
	}
	return Location;
}]);
// 身份登录验证模块
services.factory('identity', [function() {
	var x = {
		identity : null
	//	identity : { id : ___, user : ___ }
	}

	x.hasLogin = function(needLogin) {
		if ( x.identity ) {
			return true;
		} else {
			if ( needLogin ) {
				x.toLogin();
			}
			return false;
		}
	}
}])

