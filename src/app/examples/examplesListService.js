angular.module('thinkingVisually.examples.examplesList.service', [

])

// A RESTful factory for retrieving examplesList from 'examplesList.json'
.factory('examplesList', ['$http', function ($http, utils) {
  var path = 'assets/examplesList.json';
  var examplesList = $http.get(path).then(function (resp) {
    return resp.data.examplesList;
  });

  var factory = {};
  factory.all = function () {
    return examplesList;
  };
  factory.get = function (id) {
    return examplesList.then(function(){
      return utils.findById(examplesList, id);
    });
  };
  return factory;
}]);