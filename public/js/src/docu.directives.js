var directives = angular.module('docu.directives', ['docu.services']);

directives.directive('titleSwitcher', function() {
	return {
		restrict: 'EA',
		scope: { target: '=switchTarget', title: '@titleSwitcher' },
		templateUrl: '/template/directive/titleSwitcher.html',
		transclude: true,
		replace: true,
		link: function(scope, iElm, iAttrs, controller) {
			scope.toggle = function() {
				scope.target = !scope.target;
			}
		}

		/*
		restrict	指令在模版中的使用方式
		scope		false 现有scope | true 新scope | { '属性名' : '绑定策略' } 独立scope
																	@	当前属性作为字符串传递
																	=	绑定当前属性，相当于引用
																	&	传递来自父scope的函数，用以调用
		*/
	}
});

directives.directive('expander', [function(){
	// Runs during compile
	return {
		scope: true,
		restrict: 'EA',
		templateUrl: '/template/directive/navExpander.html',
		replace: false,
		transclude: false,
		link: function(scope, iElm, iAttrs, controller) {
			//data
			scope.showMe = false;
			//handdle
			scope.toggle = function() {
				scope.showMe = !scope.showMe;
			}
		}
	};
}]);


directives.directive('chapterView', ['EditStatus', 'Doc', function(EditStatus, Doc) {
	return {
		restrict: 'EA',
		scope: { chapter: '=theChapter' },
		templateUrl: '/template/directive/chapterView.html',
		replace: true,
		link: function(scope, iElm, iAttrs, controller) {
			// scope.editing = false;

			scope.edit = function() {
				// 0. 检查是否有其它正在编辑的地方
				if ( EditStatus.anythingEditing() ) return;
				// 1. 标记编辑状态
				scope.editing = true;
				scope.changed = false;
				// 2. 绑定监听事件
				scope.watch = scope.$watch('chapter.title', function(n, o) {
					if ( n == o ) return;	// ... 代价不要太大，还要验证
					scope.changed = true;
					console.log('Changed chapter : ' + scope.chapter.id);
				});
				// 3. 触发操作面板
				EditStatus.setEdit(scope);
			}
			scope.save = function() {
				// 1. 检查有无更新
				// 2. 有更新提交到服务器
				if ( scope.changed ) {
					Doc.update(scope.chapter);
				}
				// 3. 取消绑定事件，退出编辑操作
				if ( scope.watch )
					scope.watch();
				EditStatus.exitEdit();
				// 4. 取消标记编辑状态、change 状态
				delete scope.editing;
				delete scope.changed;
			}
			scope.exit = function() {
				// 1. 检查有无更新，有的话警告
				if ( scope.changed ) {
					if ( !confirm('Somthing has changed ! Really want to cancel the change ?') ) {
						scope.save();
						return;
					}
				}
				// 2. 取消绑定事件，退出编辑操作
				if ( scope.watch )
					scope.watch();
				EditStatus.exitEdit();
				// 3. 取消标记编辑状态、change 状态
				delete scope.editing;
				delete scope.changed;
			}
			scope.delett = function() {
				// 1. 确认操作
				if ( confirm('Really delete this ?') ) {
					// 1.true 取消绑定事件，退出编辑操作
					if ( scope.watch )
						scope.watch();
					EditStatus.exitEdit();
					// 取消标记编辑状态、change 状态
					delete scope.editing;
					delete scope.changed;
					// do it
					Doc.delett(scope.chapter);
					// ... how to delete a ng-repeat subject
				}
			}
		}
	}
}]);

directives.directive('sectionView', ['EditStatus', 'Doc', function(EditStatus, Doc) {
	return {
		restrict: 'EA',
		scope: { section: '=theSection' },
		templateUrl: '/template/directive/sectionView.html',
		replace: false,
		link: function(scope, iElm, iAttrs, controller) {
			// scope.editing = false;

			scope.edit = function() {
				// 0. 检查是否有其它正在编辑的地方
				if ( EditStatus.anythingEditing() ) return;
				// 1. 标记编辑状态
				scope.editing = true;
				scope.changed = false;
				// 2. 绑定监听事件
				scope.watch = scope.$watch('section', function(n, o) {
					if ( n == o ) return;	// ... 代价不要太大，还要验证
					scope.changed = true;
					console.log('Changed section : ' + scope.section.id);
				}, true);
				// 3. 触发操作面板
				EditStatus.setEdit(scope);
			}
			scope.save = function() {
				// 1. 检查有无更新
				// 2. 有更新提交到服务器
				if ( scope.changed ) {
					Doc.update(scope.section);
				}
				// 3. 取消绑定事件，退出编辑操作
				if ( scope.watch )
					scope.watch();
				EditStatus.exitEdit();
				// 4. 取消标记编辑状态、change 状态
				delete scope.editing;
				delete scope.changed;
			}
			scope.exit = function() {
				// 1. 检查有无更新，有的话警告
				if ( scope.changed ) {
					if ( !confirm('Somthing has changed ! Really want to cancel the change ?') ) {
						scope.save();
						return;
					}
				}
				// 2. 取消绑定事件，退出编辑操作
				if ( scope.watch )
					scope.watch();
				EditStatus.exitEdit();
				// 3. 取消标记编辑状态、change 状态
				delete scope.editing;
				delete scope.changed;
			}
			scope.delett = function() {
				// 1. 确认操作
				if ( confirm('Really delete this ?') ) {
					// 1.true 取消绑定事件，退出编辑操作
					if ( scope.watch )
						scope.watch();
					EditStatus.exitEdit();
					// 取消标记编辑状态、change 状态
					delete scope.editing;
					delete scope.changed;
					// do it
					Doc.delett(scope.section);
					// ... how to delete a ng-repeat subject
				}
			}
		}
	}
}]);
