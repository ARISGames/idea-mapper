angular.module( 'thinkingVisually.step5.mailit.modal', [
  'ui.bootstrap'
])

.controller('ModalMailitCtrl', function ModalMailitController($scope, $modal, $log) {
  $scope.openMailitModal = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'step5/partials/mailit-modal.tpl.html',
      controller: 'MailitModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function () {
      //$log.info('Modal ok: ' + new Date());
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };
})

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
.controller('MailitModalInstanceCtrl', function MailitModalInstanceController ($rootScope, $scope, $modalInstance, $location, $http) {

  $scope.result_from_server = ''; 

  $scope.send_email = function () {
    $scope.result_from_server = ''; 
    if (angular.element('#email').val() !== ''){

      var url_val = $location.absUrl();
      url_val     = url_val.replace($location.path(), '');
      url_val    += '/charts/' + $rootScope.currentProject.url.student_id + '/';
      url_val    += $rootScope.currentProject.url.date + '/' +$rootScope.currentProject.url.chart_type;

      var options = { 
        success: afterSuccess,  // post-submit callback 
        resetForm: true         // reset the form after successful submit 
      };

      angular.element('#url').val(url_val);
      //Submit the form manually
      //$scope.result_from_server = 'Sending email...';
      angular.element('#emailForm').ajaxSubmit(options);       
    }
    else{
      $scope.result_from_server = 'The email is required and cannot be empty';
    }
  };

  function afterSuccess(result){
    if (angular.isDefined(result.status)) {
      $scope.result_from_server = result.status.value;
    }
    else {
      $scope.result_from_server = result;
    }
    $scope.$apply();
  }

  $scope.close_mailit_modal = function () {
    $modalInstance.dismiss('cancel');
  };
})

;