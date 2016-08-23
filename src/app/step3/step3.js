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
angular.module( 'thinkingVisually.step3', [  
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
        //  Step3   //
        //////////////
        .state('step3', {
          abstract: true,
          url: '/step3',
          templateUrl: 'step3/step3.tpl.html',
          onEnter: function($rootScope){
            $rootScope.currentProject.completedStep = 3;
            $rootScope.currentProject.maxStep = ($rootScope.currentProject.maxStep > 3)? $rootScope.currentProject.maxStep : 3;
          },
          data: { 
            step: 3,
            pageTitle: 'Step 3'
          },
          
          controller: 'Step3Ctrl'
        })

        //////////////////////////////
        //  Step3 > Organizational  //
        //////////////////////////////

        .state('step3.organizational', {
          url: '/organizational',
          templateUrl: 'charts/organizational/organizational-workArea.tpl.html'
        })

        //////////////////////////////
        //       Step3 > Topic      //
        //////////////////////////////
        .state('step3.topic', {
          url: '/topic',
          templateUrl: 'charts/topic/topic-workArea.tpl.html'
        })

        //////////////////////////////
        //   Step3 > Cause/Effect   //
        //////////////////////////////
        .state('step3.cause-effect', {
          url: '/cause-effect',
          templateUrl: 'charts/cause-effect/cause-effect-workArea.tpl.html'
        })

        //////////////////////////////
        //        Step3 > Venn      //
        //////////////////////////////
        .state('step3.venn', {
          url: '/venn',
          templateUrl: 'charts/venn/venn-workArea.tpl.html'
        })

        //////////////////////////////
        //        Step3 > Plot      //
        //////////////////////////////
        .state('step3.plot', {
          url: '/plot',
          templateUrl: 'charts/plot/plot-workArea.tpl.html'
        })

        //////////////////////////////
        //        Step3 > timeline  //
        //////////////////////////////
        .state('step3.timeline', {
          url: '/timeline',
          templateUrl: 'charts/timeline/timeline-workArea.tpl.html'
        })

        ;
    }
  ]
)

/**
 * And of course we define a controller for our route.
 */
.controller( 'Step3Ctrl', function Step3Controller( $scope, $rootScope ) {
  $scope.chart = $rootScope.currentProject.chart;
  $scope.textContent = null;
  createChartDescription();
  
  function createChartDescription(){
    var chartCode = $scope.chart.boxesNum;
    var limit = chartCode;
    var textComponentIndexes = null;

    switch ($rootScope.currentProject.getChartType()){
      case 'organizational':
        chartCode = $scope.chart.rows+'x'+$scope.chart.splits;
        limit = $scope.chart.rows + ($scope.chart.rows * $scope.chart.splits) + 1;
        $scope.textContent = buildChartDescriptor(chartCode, limit, textComponentIndexes);
        break;
      case 'topic':
        limit = chartCode + 1;
        $scope.textContent = buildChartDescriptor(chartCode, limit, textComponentIndexes);
        break;        
      case 'cause-effect':
        limit = chartCode * 2;      
        $scope.textContent = buildChartDescriptor(chartCode, limit, textComponentIndexes);
        break;
      case 'venn':
        limit = chartCode === 3 ? 7 : 3;
        $scope.textContent = buildChartDescriptor(chartCode, limit, textComponentIndexes);
        break;
      case 'plot':
        limit = chartCode;
        if ($scope.chart.boxesNum === 3){
          textComponentIndexes = [0,2,4];
        }
        else if ($scope.chart.boxesNum === 4){
          textComponentIndexes = [0,1,2,4];
        }
        $scope.textContent = buildChartDescriptor(chartCode, limit, textComponentIndexes);
        break;
      case 'timeline':
        $scope.textContent = buildChartDescriptor(chartCode, limit, textComponentIndexes);
        break;
    }
  }

  $scope.getTextContent= function(){ 
    return $scope.textContent;
  };

  function buildChartDescriptor(chartCode, limit, textComponentIndexes){
    var chartDescriptor = [];
    var textComponentIndex;
    for(var i=0;i<limit;i++){
      textComponentIndex = textComponentIndexes === null ? i : textComponentIndexes[i];
      var object = {
        cls:'stx-'+chartCode+'-element'+i,
        model: $rootScope.currentProject.chart.chartNodes[i],
        titlePlaceholder: $rootScope.currentProject.chart.chartType.textComponents[i].title,
        infoText: $rootScope.currentProject.chart.chartType.textComponents[textComponentIndex].infoText
      };
      chartDescriptor.push(object);
    }
    return chartDescriptor;    
  }

})
;
