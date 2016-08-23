angular.module('thinkingVisually.popups', [])

.controller( 'popupController',['$scope','$rootScope','popupService', function popUpController( $scope, $rootScope, popupService) {

	if (angular.isDefined($rootScope.currentProject.chart) && $rootScope.currentProject.chart){
		$scope.helpText = $rootScope.currentProject.chart.chartType.help;
		$scope.chartName = $rootScope.currentProject.getChartName();
	}		

	$scope.goToIntroPopup = function(){
		popupService.goToIntroPopup();
	};

	$scope.close = function(){
		popupService.hideAll();
	};

	$scope.resetProject = function(){
		popupService.hideAll();
		$rootScope.resetProject();
	};
}])

;