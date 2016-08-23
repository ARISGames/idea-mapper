angular.module('thinkingVisually.dropArea', [])


.directive('dropArea',function($rootScope) {
    return {
        restrict: 'AE',
        require: 'ngModel',
        template:   '<div class="relative inline-block" ng-class="{\'orange-area\': showDropArea()}" ng-drop="canDragImage()" ng-drop-success="onDropSuccess($data, $event)">' +
                        '<div class="absolute top-left">' +
                            '<img ng-src="assets/img/exclamation_icon.png" ng-hide="showImage()"><br/>' +  
                            '<span class="upper" ng-hide="showImage()">Drag background here</span>' +
                        '</div>' +
                        '<div class="relative">' +
                            '<img id="displayImg" class="center-block relative" ng-show="showImage()">' + 
                            '<img src="assets/img/modal_close_btn.png" class="top-right bring-front mini" ng-show="removeImageAllowed()" ng-click="resetModel()">' + 
                        '</div>'+
                    '</div>',
        scope: {
            draggableMode: '='
        },        
        link: function(scope, iElement, iAttrs, ngModelController) {
            // Variables locales del componente
            scope.editMode = false;
            scope.currentImage = null;
            scope.prevImage = null;
            scope.defaultBg = "assets/img/paper2.png";
            
            scope.canDragImage = function(){
                return angular.isDefined(scope.draggableMode) && scope.draggableMode;
            };            

            //Metodos locales del componente
            scope.resetModel = function(){
                scope.currentImage = null;
                scope.prevImage = null;
                ngModelController.$setViewValue(null);
                ngModelController.$render();
            };

            // model set
            scope.updateModel = function(backgroundImg){
                ngModelController.$setViewValue(backgroundImg);
                ngModelController.$render();
            };
            //Se llama cada vez que se necesita hacer una actualizacion de la vista
            ngModelController.$render = function() {
                var backgroundImg = ngModelController.$viewValue;
                var printImage = $('#print-background-image');
                if (backgroundImg != null) {
                    var fullURL;
                    if (backgroundImg.slice(0, 5) === 'data:') {
                        fullURL = backgroundImg;
                    } else {
                        fullURL = 'assets/img/gallery/' + backgroundImg;
                    }
                    $('#work-area').css("background-image","url(" + fullURL + ")");
                    if(printImage.length>0){
                        printImage.attr('src',fullURL);
                    }
                } else {
                    $('#work-area').css("background-image",scope.defaultBg); // default image
                    if(printImage.length>0){
                        printImage.attr('src',scope.defaultBg);
                    }
                }
            };

            scope.onDropSuccess = function(data, evt){
                if(data !== null) {
                    scope.editMode = false;
                    // fix for background reset on step change, might run when start
                    scope.prevImage = (scope.currentImage !== null)? scope.currentImage : ngModelController.$viewValue;
                    var imgPath = data.category + '/Textured/' + data.image;
                    scope.currentImage = imgPath;
                    scope.updateModel(scope.currentImage);
                }
            };

            scope.showImage = function(){
                var backgroundImg = ngModelController.$viewValue;
                return backgroundImg != null;
            };

            scope.removeImageAllowed = function(){
                var backgroundImg = ngModelController.$viewValue;
                return (backgroundImg != null && scope.canDragImage());
            };

            scope.showDropArea = function(){
                var backgroundImg = ngModelController.$viewValue;
                return backgroundImg == null;
            };

            /* This event is trigger by editableText when an asset is dropped */
            $rootScope.$on('dropAssetEvent', function () {
                // prevent background to be assign when an asset is dropped
                scope.currentImage = scope.prevImage;
                scope.updateModel(scope.currentImage);
            });
        }
    };
});
