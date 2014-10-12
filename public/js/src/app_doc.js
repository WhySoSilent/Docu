var app_doc = angular.module('docu.doc',['docu.services', 'docu.directives']);

app_doc.controller('docCtrl', ['$scope', 'Doc', 'EditStatus', function($scope, Doc, EditStatus) {
	Doc.getDetail($scope);	// $scope.doc = 
	$scope.docServer = Doc;
	$scope.editStatus = EditStatus;

	$scope.addNewChapter = function() {
		Doc.addNewChapter();
	}
	$scope.addNewSection = function(chapter) {
		Doc.addNewSection(chapter);
	}
}]);

app_doc.controller('navCtrl', [function() {

}]);

app_doc.controller('noticeCtrl', ['$scope', 'Notice', function($scope, Notice) {
	$scope.notice = Notice;
}]);

app_doc.controller('optPanelCtrl', ['$scope', 'EditStatus', function($scope, EditStatus) {
	$scope.save = function() {
		EditStatus.save();
	}
	$scope.exit = function() {
		EditStatus.exit();
	}
	$scope.delett = function() {
		EditStatus.delett();
	}
}]);


$(function(){
    //实现左边 Nav 区域的自动停靠功能的滚动监听
    var berthDom = $("#autoBerth");
    var windowDom = $(window);
    windowDom.scroll(function(event){
        var scrolled = windowDom.scrollTop();
        // console.log(scrolled);
        if ( scrolled >= 100 ) {
            berthDom.addClass('berthStatus');
        }
        if ( scrolled < 100 ) {
            berthDom.removeClass('berthStatus');
        }
    });

});