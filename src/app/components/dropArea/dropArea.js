angular.module('thinkingVisually.dropArea', [])


.directive('dropArea',function($rootScope) {
    return {
        restrict: 'AE',
        require: 'ngModel',
        template:   '<div class="relative inline-block can-upload-bg" ng-click="browseImage()" ng-class="{\'orange-area\': showDropArea()}" ng-drop="canDragImage()" ng-drop-success="onDropSuccess($data, $event)">' +
                        '<input id="file-picker" type="file" ng-hide="true">' +
                        '<div class="absolute top-left">' +
                            '<img ng-src="assets/img/cloud-upload-2-white.png" ng-hide="showImage()"><br/>' +  
                            '<span class="upper" ng-hide="showImage()">Or drag background from &#8617;</span>' +
                        '</div>' +
                        '<div class="relative">' +
                            '<img id="displayImg" class="center-block relative" ng-show="showImage()">' + 
                            '<img src="assets/img/modal_close_btn.png" class="top-right bring-front mini" ng-show="removeImageAllowed()" ng-click="resetModel(); $event.stopPropagation();">' + 
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
                    $('#work-area').css("background-image",'url('+scope.defaultBg+')'); // default image
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

            scope.browseImage = function(){
                var picker = iElement.find('#file-picker');
                picker[0].value = null;
                var fn = function(){
                    picker[0].removeEventListener('change', fn);
                    if (picker[0].files.length === 0) return;
                    var file = picker[0].files[0];
                    var reader = new FileReader();
                    reader.addEventListener('load', function(){
                        scope.editMode = false;
                        // fix for background reset on step change, might run when start
                        var imgPath = reader.result;
                        scope.prevImage = imgPath;
                        scope.currentImage = imgPath;
                        scope.updateModel(scope.currentImage);
                        scope.$apply();
                    }, false);
                    reader.readAsDataURL(file);
                };
                picker[0].addEventListener('change', fn);
                picker.click();
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
