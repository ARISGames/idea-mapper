angular.module( 'thinkingVisually.step5', [  
  'ui.router'
])

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider

        //////////////
        //  Step5   //
        //////////////
        .state('step5', {
          abstract: true,
          url: '/step5',
          templateUrl: 'step5/step5.tpl.html',
          onEnter: function($rootScope){
            $rootScope.currentProject.completedStep = 4;
            $rootScope.currentProject.maxStep = ($rootScope.currentProject.maxStep > 4)? $rootScope.currentProject.maxStep : 4;
          },          
          data: { 
            step: 5,
            pageTitle: 'Step 5'
          },     
          
          controller: 'Step5Ctrl'
        })

        //////////////////////////////
        //  Step5 > Organizational  //
        //////////////////////////////
        .state('step5.organizational', {
          url: '/organizational',
          templateUrl: 'charts/organizational/organizational-workArea.tpl.html'
        })

        //////////////////////////////
        //       Step5 > Topic      //
        //////////////////////////////
        .state('step5.topic', {
          url: '/topic',
          templateUrl: 'charts/topic/topic-workArea.tpl.html'
        })

        //////////////////////////////
        //   Step5 > Cause/Effect   //
        //////////////////////////////
        .state('step5.cause-effect', {
          url: '/cause-effect',
          templateUrl: 'charts/cause-effect/cause-effect-workArea.tpl.html'
        })

        //////////////////////////////
        //       Step5 > Venn       //
        //////////////////////////////
        .state('step5.venn', {
          url: '/venn',
          templateUrl: 'charts/venn/venn-workArea.tpl.html'
        })

        //////////////////////////////
        //       Step5 > Plot       //
        //////////////////////////////
        .state('step5.plot', {
          url: '/plot',
          templateUrl: 'charts/plot/plot-workArea.tpl.html'
        })

        //////////////////////////////
        //      Step5 > Timeline    //
        //////////////////////////////
        .state('step5.timeline', {
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
.controller( 'Step5Ctrl', function Step5Controller( $scope, $rootScope, $http ) {
  $scope.chart = $rootScope.currentProject.chart;
  $scope.firstEvent = true;
  $scope.savingProcess = false;

function createChartDescription(){
    var chartCode = $scope.chart.boxesNum;
    var limit = chartCode;

    switch ($rootScope.currentProject.getChartType()){
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
        model: $rootScope.currentProject.chart.chartNodes[i],
        titlePlaceholder: $rootScope.currentProject.chart.chartType.textComponents[i].title,
        infoText: $rootScope.currentProject.chart.chartType.textComponents[i].infoText
      };
      chartDescriptor.push(object);
    }
    return chartDescriptor;    
  }

  $scope.textContent = null;

  $scope.getTextContent= function(){ 
    return $scope.textContent;
  };


  function saveProject(){
    var data = {
      info:JSON.stringify($rootScope.currentProject)
    };
    $http.post('core/saveProject.php',data)
      .success(function(data) {
        afterSuccess(data);
      })
      .error(function(data) { // called asynchronously if an error occurs
        console.log('error');
      }
    );
  }

  $scope.projectSaved = false;
  function afterSuccess(result){
    //console.log("Salvado");
    if(result.status !== undefined && result.status.value !== undefined) {
      $rootScope.currentProject.url = result.status.value;
    }
    $scope.projectSaved = true;
    $scope.savingProcess = false;
  }

  createChartDescription();

  $scope.$on('$viewContentLoaded', function(){
    if($scope.firstEvent){
      $scope.firstEvent = false;
      $scope.savingProcess = true;
      saveProject();
    }
  });  
})

;