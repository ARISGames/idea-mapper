/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'thinkingVisually.step2', [  
  'ui.router'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider

        //////////////
        //  Step2   //
        //////////////
        .state('step2', {
          abstract: true,
          url: '/step2',
          templateUrl: 'step2/step2.tpl.html',
          onEnter: function($rootScope){
            $rootScope.currentProject.completedStep = 2;
            $rootScope.currentProject.maxStep = ($rootScope.currentProject.maxStep > 2)? $rootScope.currentProject.maxStep : 2;
          },
          onExit: function($rootScope){
            if ($rootScope.currentProject.getChartType() == 'organizational'){
                $rootScope.currentProject.chart.boxesNum = $rootScope.currentProject.chart.rows +
                    ($rootScope.currentProject.chart.rows * $rootScope.currentProject.chart.splits) + 1;
            }
          },
          data: { 
            step: 2,
            pageTitle: 'Step 2'
          },
          
          controller: 'Step2Ctrl'
        })

        //////////////////////////////
        //  Step2 > Organizational  //
        //////////////////////////////
        .state('step2.organizational', {
          url: '/organizational',
          templateUrl: 'charts/organizational/organizational-workArea.tpl.html',
        })

        //////////////////////////////
        //       Step2 > Topic      //
        //////////////////////////////
        .state('step2.topic', {
          url: '/topic',
          templateUrl: 'charts/topic/topic-workArea.tpl.html',
        })

        //////////////////////////////
        //   Step2 > Cause/Effect   //
        //////////////////////////////
        .state('step2.cause-effect', {
          url: '/cause-effect',
          templateUrl: 'charts/cause-effect/cause-effect-workArea.tpl.html',
        })      

        //////////////////////////////
        //  Step2 > Venn  //
        //////////////////////////////

        .state('step2.venn', {
          url: '/venn',
          templateUrl: 'charts/venn/venn-workArea.tpl.html',
        })

        //////////////////////////////
        //       Step2 > Plot       //
        //////////////////////////////
        .state('step2.plot', {
          url: '/plot',
          templateUrl: 'charts/plot/plot-workArea.tpl.html',
        })

        //////////////////////////////
        //       Step2 > Timeline   //
        //////////////////////////////
        .state('step2.timeline', {
          url: '/timeline',
          templateUrl: 'charts/timeline/timeline-workArea.tpl.html',
        })
        ;
    }
  ]
)

/**
 * And of course we define a controller for our route.
 */
.controller('Step2Ctrl', function Step2Controller($scope, $rootScope){
  $scope.chart = $rootScope.currentProject.chart;
  $scope.chartLabels = null;
  loadChartLabels();

  function loadChartLabels(){
    var labels = [];
    var chartCode = $scope.chart.boxesNum;
    var limit = chartCode;

    switch ($rootScope.currentProject.getChartType()){
      case 'organizational':
        chartCode = $scope.chart.rows+'x'+$scope.chart.splits;
        limit = $scope.chart.rows + ($scope.chart.splits == 1 ? $scope.chart.rows : 0) + 1;
        break;
      case 'topic':
        limit = chartCode + 1;
        break;        
      case 'cause-effect':
        limit = chartCode * 2;
        break;
      case 'venn':
        limit = chartCode === 3 ? 7 : 3;
        break;
      case 'plot':
        limit = 5;
        break;
      case 'timeline':
        limit = chartCode;
        break;
    }

    for(var i=0;i<limit;i++){
      var object = {
        cls:'lbl-'+chartCode+'-element'+i,
        infoText: $scope.chart.chartType.labels[i].infoText
      };
      labels.push(object);
    }

    $scope.chartLabels = labels;
  }

  $scope.getChartLabels= function(){ 
    return $scope.chartLabels;
  };

  /* Update the labels count and distribution when chart boxes change */
  $scope.$watch(function(){
      return $rootScope.currentProject.chart.boxesNum;
  },function(n,o){
      loadChartLabels(); 
  },true);

  /* Update the labels count and distribution when chart rows change */
  $scope.$watch(function(){
      return $rootScope.currentProject.chart.rows;
  },function(n,o){
      loadChartLabels(); 
  },true);

  /* Update the labels count and distribution when chart rows splits */
  $scope.$watch(function(){
      return $rootScope.currentProject.chart.splits;
  },function(n,o){
      loadChartLabels(); 
  },true);  
})

;

