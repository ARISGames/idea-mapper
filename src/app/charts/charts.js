angular.module( 'thinkingVisually.charts', [
  'thinkingVisually.charts.chartType.model',
  'thinkingVisually.charts.chartNode.model',
  'thinkingVisually.charts.chart.model',
  'thinkingVisually.charts.project.model',
  'thinkingVisually.charts.chartTypes.service',
  'thinkingVisually.popup.service',
  'ui.router'
])

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider
        //////////////
        //  Charts  //
        //////////////
        .state('charts', {
          abstract: true,
          url: '/charts/:studentId/:date',
          templateUrl: 'charts/charts.tpl.html',
          data: { 
            pageTitle: 'Charts'
          },
      controller: 'ChartCtrl'
        })

        //////////////////////////////
        //  Step5 > Organizational  //
        //////////////////////////////
        .state('charts.organizational', {
          url: '/organizational',
          templateUrl: 'charts/organizational/organizational-workArea.tpl.html'
        })

        //////////////////////////////
        //       Step5 > Topic      //
        //////////////////////////////
        .state('charts.topic', {
          url: '/topic',
          templateUrl: 'charts/topic/topic-workArea.tpl.html'
        })

        //////////////////////////////
        //   Step5 > Cause/Effect   //
        //////////////////////////////
        .state('charts.cause-effect', {
          url: '/cause-effect',
          templateUrl: 'charts/cause-effect/cause-effect-workArea.tpl.html'
        })

        //////////////////////////////
        //       Step5 > Venn       //
        //////////////////////////////
        .state('charts.venn', {
          url: '/venn',
          templateUrl: 'charts/venn/venn-workArea.tpl.html'
        })

        //////////////////////////////
        //       Step5 > Plot       //
        //////////////////////////////
        .state('charts.plot', {
          url: '/plot',
          templateUrl: 'charts/plot/plot-workArea.tpl.html'
        })

        //////////////////////////////
        //      Step5 > Timeline    //
        //////////////////////////////
        .state('charts.timeline', {
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

.controller( 'ChartCtrl', function ChartController( $http, $rootScope, $scope, $stateParams, popupService, $location ) {
  popupService.hideAll();
  $scope.currentProject = {};
  $scope.textContent = [];
  $scope.chart = {};
  $rootScope.username = "";


  var charType = $location.path();
  charType = charType.split('/');
  charType = charType[charType.length-1];

  $scope.chartType = charType;

  //onLoadCompleted(currentProject);
  $http.post('assets/projects/'+$stateParams.studentId+'/'+charType+'-'+$stateParams.date+'.js')
    .success(function(data) {
      onLoadCompleted(data);
    })
    .error(function(data) { // called asynchronously if an error occurs
      console.log('error');
    }
  );

  function onLoadCompleted(data){
    $scope.currentProject = data;
    $scope.textContent = [];
    $scope.chart = data.chart;
    createChartDescription();

    var name = $stateParams.studentId;
    var lastChar = name.substr(name.length - 1);
    name += '\'';
    if(lastChar!='S'&&lastChar!='s'){
      name += 's';
    }
    name += ' ' + $scope.chartType + ' chart';
    $rootScope.username = name;
  }

  function createChartDescription(){
    var chartCode = $scope.chart.boxesNum;
    var limit = chartCode;

    switch ($scope.chartType){
      case 'organizational':
        chartCode = $scope.chart.rows+'x'+$scope.chart.splits;
        limit = $scope.chart.rows + ($scope.chart.rows * $scope.chart.splits) + 1;
        $scope.textContent = buildChartDescriptor(chartCode, limit);
        break;
      case 'topic':
        limit = chartCode + 1;
        $scope.textContent = buildChartDescriptor(chartCode, limit);
        break;        
      case 'cause-effect':
        limit = chartCode * 2;      
        $scope.textContent = buildChartDescriptor(chartCode, limit);
        break;
      case 'venn':
        limit = chartCode === 3 ? 7 : 3;
        $scope.textContent = buildChartDescriptor(chartCode, limit);
        break;
      case 'plot':
        limit = chartCode;      
        $scope.textContent = buildChartDescriptor(chartCode, limit);
        break;
      case 'timeline':
        $scope.textContent = buildChartDescriptor(chartCode, limit);
        break;
    }
  }

  // TODO move this funtion to a shared service
  function buildChartDescriptor(chartCode, limit){
    var chartDescriptor = [];
    for(var i=0;i<limit;i++){
      var object = {
        cls:'stx-'+chartCode+'-element'+i,
        model: $scope.currentProject.chart.chartNodes[i],
        titlePlaceholder: $scope.currentProject.chart.chartType.textComponents[i].title,
        infoText: $scope.currentProject.chart.chartType.textComponents[i].infoText
      };
      chartDescriptor.push(object);
    }
    return chartDescriptor;    
  }

  $scope.getTextContent= function(){ 
    return $scope.textContent;
  };
})

;