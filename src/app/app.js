angular.module( 'thinkingVisually', [
  'templates-app',
  'templates-common',
  'thinkingVisually.charts.chartType.model',
  'thinkingVisually.charts.chartNode.model',
  'thinkingVisually.charts.chart.model',  
  'thinkingVisually.charts.project.model',
  'thinkingVisually.popup.service',
  'thinkingVisually.utils.service',
  'thinkingVisually.charts',
  'thinkingVisually.examples',
  'thinkingVisually.popups',
  'thinkingVisually.numericStepper',
  'thinkingVisually.colorStepper',
  'thinkingVisually.editableText',
  'thinkingVisually.dropArea',
  'thinkingVisually.step1',
  'thinkingVisually.step2',
  'thinkingVisually.step3',
  'thinkingVisually.step4',
  'thinkingVisually.step5.linkit.modal',
  'thinkingVisually.step5.mailit.modal',
  'thinkingVisually.step5',
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'LocalStorageModule',
  'ngDraggable'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, localStorageServiceProvider ) {
    $urlRouterProvider.otherwise( '/step1' );
    localStorageServiceProvider.setPrefix('thinkingVisually');
})

.run(
  [          '$rootScope', '$state', '$stateParams', '$urlRouter',
    function ($rootScope,   $state,   $stateParams, $urlRouter) {
      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope within your applications.For example,
      // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
      // to active whenever 'contacts.list' or one of its decendents is active.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      $rootScope.$on('$locationChangeSuccess', function(evt) {
        // Halt state change from even starting
        evt.preventDefault();
        // Perform custom logic
        var meetsRequirement = true; // TODO: Meets following rule: $rootScope.$completedStep + 1 = newState.step
        // Continue with the update and state transition if logic allows
        if (meetsRequirement) {
          $urlRouter.sync();
        }
      });
    }
  ]
)

.controller( 'AppController', function AppController ($scope, $rootScope, $state, localStorageService, $location, Project, Chart, ChartType, popupService ) {

  // Get/Create currentProject
  if (localStorageService.get('currentProject') == null ){
    $rootScope.currentProject = new Project('', '', null, 1, 0, null);
  }
  else {
     $rootScope.currentProject = Project.build(localStorageService.get('currentProject'));
  }

  // Attach the green buttons to its reference
  angular.element(document).ready(function () {
    if(TEACHING_TIPS_LINK !== undefined) {
      $(".teaching-tips-link").attr('target','_blank').attr("href",TEACHING_TIPS_LINK);
    }
    if(RETURN_TO_STORIES_LINK !== undefined) {
      $(".stories-link").attr("href",RETURN_TO_STORIES_LINK);
    }
  });

  // Bind to local storage service
  localStorageService.bind($rootScope, 'currentProject', $rootScope.currentProject, 'currentProject');

  $rootScope.resetProject = function(){
    $rootScope.currentProject = new Project($rootScope.currentProject.studentName, $rootScope.currentProject.teacherName, null, 1, 0, null);
    var toState = 'step1.reset';
    var toParams = {};
    $rootScope.currentProject.currentStep = 1;  
    $state.go(toState, toParams);
  };

  $rootScope.isAllowedStep = function(step){
    return $rootScope.currentProject.completedStep >= (step - 1) || step === 5 || ($rootScope.currentProject.completedStep===2 && step===4);
  };

  $rootScope.goToStep = function(step){
    var toState = 'step1.home';
    var toParams = {};
    var movementPermitted = $rootScope.isAllowedStep(step);
    var meetsRequirement = false;
    
    if (movementPermitted) {
      switch (step) {
        case 1:
          meetsRequirement = true;
          if ($rootScope.currentProject.chart != null ){
            movementPermitted = false;
            popupService.showResetPopup();
          }
          break;
        case 2:
        case 3:
        case 4:
        case 5:
          meetsRequirement = $rootScope.currentProject.chart != null;
          if (meetsRequirement) {
            toState = 'step' + step + '.' + $rootScope.currentProject.getChartType();
          }
          break;   
      }      
    }

    if (movementPermitted && meetsRequirement) {
      //Save current step
      $rootScope.currentProject.currentStep = step;
      
      $state.go(toState, toParams);
    }
  };

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Idea Mapper' ;
    }
  });

  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
  });

  $scope.getStudentChartTitle = function(){
    var title = $rootScope.currentProject.studentName;
    if ($rootScope.currentProject.chart != null ){
      title += (title!=="")? "'s " : "";
      title += $rootScope.currentProject.getChartName();
    }
    return title;
  };

  $scope.popupManager = popupService;
  popupService.showWelcomePopup();

})

;

