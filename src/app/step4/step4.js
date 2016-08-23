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
angular.module( 'thinkingVisually.step4', [  
  'ui.router',
  'thinkingVisually.step4.imagesGallery.service'
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
        //  Step4   //
        //////////////
        .state('step4', {
          abstract: true,
          url: '/step4',
          templateUrl: 'step4/step4.tpl.html',
          onEnter: function($rootScope){
            $rootScope.currentProject.completedStep = 4;
            $rootScope.currentProject.maxStep = ($rootScope.currentProject.maxStep > 4)? $rootScope.currentProject.maxStep : 4;
          },          
          data: { 
            step: 4,
            pageTitle: 'Step 4'
          },

          resolve: {
            imagesGallery: ['imagesGallery',
              function( imagesGallery){
                return imagesGallery.all();
              }]
          },          
          
          controller: 'Step4Ctrl'
        })

        //////////////////////////////
        //  Step4 > Organizational  //
        //////////////////////////////
        .state('step4.organizational', {
          url: '/organizational',
          templateUrl: 'charts/organizational/organizational-workArea.tpl.html'
        })

        //////////////////////////////
        //       Step4 > Topic      //
        //////////////////////////////
        .state('step4.topic', {
          url: '/topic',
          templateUrl: 'charts/topic/topic-workArea.tpl.html'
        })

        //////////////////////////////
        //   Step4 > Cause/Effect   //
        //////////////////////////////
        .state('step4.cause-effect', {
          url: '/cause-effect',
          templateUrl: 'charts/cause-effect/cause-effect-workArea.tpl.html'
        })

        //////////////////////////////
        //       Step4 > Venn       //
        //////////////////////////////
        .state('step4.venn', {
          url: '/venn',
          templateUrl: 'charts/venn/venn-workArea.tpl.html'
        })

        //////////////////////////////
        //       Step4 > Plot       //
        //////////////////////////////
        .state('step4.plot', {
          url: '/plot',
          templateUrl: 'charts/plot/plot-workArea.tpl.html'
        })

        //////////////////////////////
        //       Step4 > timeline   //
        //////////////////////////////
        .state('step4.timeline', {
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
.controller( 'Step4Ctrl', function Step4Controller( $scope, $rootScope, imagesGallery ) {
  $scope.chart = $rootScope.currentProject.chart;
  $scope.isOpen = new Array( imagesGallery.length );

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
  // display sidebar thumbnails for the current chart type and multiplicy
  function showChartSpecificGallery(){
    $( '.' + $rootScope.currentProject.getChartType() ).addClass("visible-thumb");
  }

  // TODO move this funtion to a shared service
  function buildChartDescriptor(chartCode, limit){
    var chartDescriptor = [];
    for(var i=0;i<limit;i++){
      var object = {
        cls:'stx-'+chartCode+'-element'+i,
        index: i,
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

  // This is a helper function for the accordiong desired behaviour.
  $scope.headingClick = function(event) {
    showChartSpecificGallery();
    // Set white arrow in open position base on the isOpen array
    $(".arrow_open").removeClass("arrow_open").attr("src","assets/img/open_btn.png");
    $("#"+event.target.id+"_arrow").attr("src","assets/img/close_btn.png").addClass("arrow_open");
  };

  $scope.$watch('isOpen', function(value){
    for(var i=0; i<value.length; i++) {
      if(value[i]) {
        return;
      }
    }
    $(".arrow_open").removeClass("arrow_open").attr("src","assets/img/open_btn.png");
  }, true);

  $scope.imagesGallery = imagesGallery;
  createChartDescription();
})

;
