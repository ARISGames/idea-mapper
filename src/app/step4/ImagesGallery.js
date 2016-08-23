angular.module('thinkingVisually.step4.imagesGallery.service', [

])

// A RESTful factory for retrieving images gallery from 'imagesGallery.json'
.factory('imagesGallery', ['$http', function ($http, utils) {
  var path = 'assets/imagesGallery.json';
  var imagesGallery = $http.get(path).then(function (resp) {
    return resp.data.categories;
  });

  var factory = {};
  factory.all = function () {
    return imagesGallery;
  };
  factory.get = function (id) {
    return imagesGallery.then(function(){
      return utils.findById(imagesGallery, id);
    });
  };
  return factory;
}]);