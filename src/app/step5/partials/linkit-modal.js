angular.module( 'thinkingVisually.step5.linkit.modal', [
  'ui.bootstrap'
])

.controller('ModalLinkitCtrl', function ModalLinkitController($rootScope, $scope, $modal, $log, $location,popupService) {
  $scope.openLinkitModal = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'step5/partials/linkit-modal.tpl.html',
      controller: 'LinkitModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function () {
      //$log.info('Modal ok: ' + new Date());
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openPrintModal = function(){
    var chartType = $rootScope.currentProject.chart.chartType.type;
    if(chartType=='venn'||chartType=='cause-effect'){
      var userAgent = window.navigator.userAgent;
      var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};
      var finalBrowser = 'unknown';
      for(var key in browsers) {
        if(browsers[key].test(userAgent)) {
          finalBrowser = key;
          break;
        }
      }
      switch(finalBrowser){
        case 'chrome':
        case 'unknown':
        case 'internet explorer':
        case 'safari':
          popupService.showPrintHelpPopup();
        break;

        default:
          window.print();  
        break;
      }
    }else{
      window.print();
    }
  };

})

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
.controller('LinkitModalInstanceCtrl', function LinkitModalInstanceController ($rootScope, $scope, $modalInstance, $location) {

  $scope.link_text = '';

  $scope.make_link = function () {
    var url = $location.absUrl();
    url = url.replace($location.path(), '');
    url += '/charts/' +
           $rootScope.currentProject.url.student_id + '/' +
           $rootScope.currentProject.url.date + '/' + $rootScope.currentProject.url.chart_type;
    $scope.link_text = url;
    //$modalInstance.close();
  };

  $scope.close_linkit_modal = function () {
    $modalInstance.dismiss('cancel');
  };
})

;