angular.module('thinkingVisually.charts.chartTypes.service', [

])

// A RESTful factory for retrieving chartTypes from 'chartTypes.json'
.factory('chartTypes', ['$http', function ($http, utils) {
  var path = 'assets/chartTypes.json';
  var chartTypes = $http.get(path).then(function (resp) {
    return resp.data.chartTypes;
  });

  var factory = {};
  factory.all = function () {
    return chartTypes;
  };
  factory.get = function (id) {
    return chartTypes.then(function(){
      return utils.findById(chartTypes, id);
    });
  };
  return factory;
}])

;