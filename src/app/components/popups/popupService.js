angular.module('thinkingVisually.popup.service', [])

  .factory('popupService',['$rootScope','$modal', function($rootScope,$modal) {
    var serviceInstance = {
      currentPopup:null,

      showWelcomePopup:function(){
        this.hideAll();
        this.currentPopup = $modal.open({
          templateUrl: 'components/popups/welcomePopup.tpl.html',
          backdrop:false,
          controller:'popupController'
        });
      },

      goToIntroPopup:function(){
        this.hideAll();
        this.currentPopup = $modal.open({
          templateUrl: 'components/popups/introPopup.tpl.html',
          backdrop:false,
          controller:'popupController'
        });
      },

      showChartHelpPopup:function(){
        var chart = $rootScope.currentProject.chart;
        this.hideAll();
        if(chart===null || $rootScope.currentProject.currentStep===1){ 
          this.currentPopup = $modal.open({
            templateUrl: 'components/popups/helpPopup.tpl.html',
            backdrop:false,
            controller:'popupController'
          });
        }else{
          this.currentPopup = $modal.open({
            templateUrl: 'components/popups/chartHelpPopup.tpl.html',
            backdrop:false,
            controller:'popupController'
          });
        }
      },

      showResetPopup:function(){
        var chart = $rootScope.currentProject.chart;
        this.hideAll();
        this.currentPopup = $modal.open({
          templateUrl: 'components/popups/resetPopup.tpl.html',
          backdrop:false,
          controller:'popupController'
        });
      },

      showPrintHelpPopup:function(){
        this.hideAll();
        this.currentPopup = $modal.open({
          templateUrl: 'components/popups/printHelpPopup.tpl.html',
          backdrop:false,
          controller:'popupController'
        });
      },

      hideAll:function(){
        if(this.currentPopup!=null){
          this.currentPopup.dismiss();
          this.currentPopup = null;
        }
      }

    };
    
    return serviceInstance;
  }]);