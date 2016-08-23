angular.module( 'thinkingVisually.examples', [
  'thinkingVisually.examples.examplesList.service',
  'ui.router'
])

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider
        ////////////////
        //  Examples  //
        ////////////////
        .state('examples', {
          abstract: true,
          url: '/examples',
          templateUrl: 'examples/examples.tpl.html',
          // Use `resolve` to resolve any asynchronous controller dependencies
          // *before* the controller is instantiated. In this case, since examplesList
          // returns a promise, the controller will wait until examplesList.all() is
          // resolved before instantiation. Non-promise return values are considered
          // to be resolved immediately.
          resolve: {
            examplesList: ['examplesList',
              function( examplesList){
                return examplesList.all();
              }]
          },
          data: { 
            pageTitle: 'Examples'
          },
          controller: ['$scope', '$state', 'examplesList',
            function (  $scope,   $state,   examplesList) {
              $scope.examplesList = examplesList;
              $scope.exampleFile = (examplesList != null && examplesList.length>0)? examplesList[0].file : 'default.png';
            }]
        })

        /////////////////////////
        //  Examples > Detail  //
        /////////////////////////
        .state('examples.detail', {
          url: '/{exampleId:[0-9]{1,4}}',
          templateUrl: 'examples/partials/example.tpl.html',
          controller: ['$scope', '$state', '$stateParams', 
            function (  $scope,   $state,  $stateParams) {
              //$scope.exampleId = $stateParams.exampleId;
              $scope.exampleFile = 'default.png';
              for (var i = 0; i < $scope.examplesList.length; i++) {
                if($scope.examplesList[i].id == $stateParams.exampleId){
                  $scope.exampleFile = $scope.examplesList[i].file; 
                }
              }
            }]
        });
    }
  ]
)

/**
 * And of course we define a controller for our route.
 *
.controller( 'ExamplesCtrl', function ExamplesController( $scope ) {
})*/

;