/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/step1`, however, could exist several additional folders representing
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
angular.module( 'thinkingVisually.step1', [
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
        //  Step1   //
        //////////////
        .state('step1', {

          // With abstract set to true, that means this state can not be explicitly activated.
          // It can only be implicitly activated by activating one of it's children.
          abstract: true,

          // This abstract state will prepend '/step1' onto the urls of all its children.
          url: '/step1',

          // Example of loading a template from a file. This is also a top level state,
          // so this template file will be loaded and then inserted into the ui-view
          // within index.html.
          templateUrl: 'step1/step1.tpl.html',

          // Use `resolve` to resolve any asynchronous controller dependencies
          // *before* the controller is instantiated. In this case, since chartTypes
          // returns a promise, the controller will wait until chartTypes.all() is
          // resolved before instantiation. Non-promise return values are considered
          // to be resolved immediately.
          resolve: {
            chartTypes: ['chartTypes',
              function( chartTypes){
                return chartTypes.all();
              }]
          },

          data: { 
            step: 1,
            pageTitle: 'Step 1'
          },

          // You can pair a controller to your template. There *must* be a template to pair with.
          controller: ['$scope', '$state', 'chartTypes', 'utils',
            function (  $scope,   $state,   chartTypes,   utils) {

              // Add a 'chartTypes' field in this abstract parent's scope, so that all
              // child state views can access it in their scopes. Please note: scope
              // inheritance is not due to nesting of states, but rather choosing to
              // nest the templates of those states. It's normal scope inheritance.
              $scope.chartTypes = chartTypes;
            }]
        })

        /////////////////////
        //   Step1 > Home  //
        /////////////////////

        // Using a '.' within a state name declares a child within a parent.
        // So you have a new state 'home' within the parent 'step1' state.
        .state('step1.home', {

          // Using an empty url means that this child state will become active
          // when its parent's url is navigated to. Urls of child states are
          // automatically appended to the urls of their parent. So this state's
          // url is '/step1' (because '/step1' + '').
          url: '',

          // IMPORTANT: Now we have a state that is not a top level state. Its
          // template will be inserted into the ui-view within this state's
          // parent's template; so the ui-view within step1.tpl.html. This is the
          // most important thing to remember about templates.
          templateUrl: 'step1/step1.home.tpl.html',  

          controller: ['$rootScope', function ( $rootScope) {
              if ($rootScope.currentProject.currentStep != 1 || $rootScope.currentProject.chart != null) {
                $rootScope.goToStep($rootScope.currentProject.currentStep);
              }
          }]              
        })

        /////////////////////
        //   Step1 > Reset  //
        /////////////////////

        // Using a '.' within a state name declares a child within a parent.
        // So you have a new state 'home' within the parent 'step1' state.
        .state('step1.reset', {

          // Using an empty url means that this child state will become active
          // when its parent's url is navigated to. Urls of child states are
          // automatically appended to the urls of their parent. So this state's
          // url is '/step1' to cleanup any previous url.
          url: '/start',

          // IMPORTANT: Now we have a state that is not a top level state. Its
          // template will be inserted into the ui-view within this state's
          // parent's template; so the ui-view within step1.tpl.html. This is the
          // most important thing to remember about templates.
          templateUrl: 'step1/step1.home.tpl.html',  

          controller: ['$rootScope', function ( $rootScope) {
          }]              
        })

        ///////////////////////
        //   Step1 > Detail  //
        ///////////////////////

        // You can have unlimited children within a state. Here is a second child
        // state within the 'step1' parent state.
        .state('step1.detail', {

          // Urls can have parameters. They can be specified like :param or {param}.
          // If {} is used, then you can also specify a regex pattern that the param
          // must match. The regex is written after a colon (:). Note: Don't use capture
          // groups in your regex patterns, because the whole regex is wrapped again
          // behind the scenes. Our pattern below will only match numbers with a length
          // between 1 and 4.

          // Since this state is also a child of 'step1' its url is appended as well.
          // So its url will end up being '/step1/{chartTypeId:[0-9]{1,4}}'. When the
          // url becomes something like '/step1/42' then this state becomes active
          // and the $stateParams object becomes { chartTypeId: 42 }.
          url: '/{chartTypeId:[0-9]{1,4}}',

          // If there is more than a single ui-view in the parent template, or you would
          // like to target a ui-view from even higher up the state tree, you can use the
          // views object to configure multiple views. Each view can get its own template,
          // controller, and resolve data.

          // View names can be relative or absolute. Relative view names do not use an '@'
          // symbol. They always refer to views within this state's parent template.
          // Absolute view names use a '@' symbol to distinguish the view and the state.
          // So 'foo@bar' means the ui-view named 'foo' within the 'bar' state's template.
          views: {

            // So this one is targeting the unnamed view within the parent state's template.
            '': {
              templateUrl: 'step1/step1.detail.tpl.html',
              controller: ['$rootScope', '$scope', '$stateParams', 'utils' , 'Chart', 'ChartType',
                function (  $rootScope, $scope,   $stateParams,   utils,  Chart, ChartType) {
                  var chartType = ChartType.build(utils.findById($scope.chartTypes, $stateParams.chartTypeId));
                  var chart = new Chart(chartType, chartType.defaultBoxesNum, chartType.defaultRows, chartType.defaultSplits, chartType.defaultTitleColor, chartType.defaultBodyColor, null, null);

                  $scope.chartType = chartType;
                  $rootScope.currentProject.chart = chart;
                  $rootScope.currentProject.completedStep = 1;
                  $rootScope.currentProject.maxStep = 1;
                }]
            }
          }        
        });
    }
  ]
)

/**
 * And of course we define a controller for our route.
 */
.controller( 'Step1Ctrl', function Step1Controller( $scope ) {
})

;

