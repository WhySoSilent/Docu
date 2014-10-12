var app_project = angular.module('docu.project', ['ngRoute', 'docu.directives', 'docu.services']);
// .config(function($routeProvider) {	//...这个地方是不是不利于压缩
// 	$routeProvider
// 	.when('/', {controller: 'projectCtrl', templateUrl: '/template/project.html'})
// 	.when('/doc', {controller: 'docCtrl', templateUrl: '/template/doc.html'});
// });

app_project.controller('projectCtrl', ['$scope', 'Project', function($scope, Project) {
	Project.getDetail($scope);

	$scope.addNewDoc = function() {
		//...
	}
}]);

app_project.controller('teamCtrl', ['$scope', 'Project', function($scope, Project) {
	// $scope.members = Project.getMembers();
	
	$scope.addNewMember = function() {
		//...
	}
}]);