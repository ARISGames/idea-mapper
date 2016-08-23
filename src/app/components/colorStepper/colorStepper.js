angular.module('thinkingVisually.colorStepper', [])


.directive('colorStepper', function() {
    return {
        restrict: 'AE',
        require: 'ngModel',
        template: '<button type="button" class="btn-minus" ng-click="decrement()" ng-disabled="isOverMin()"></button>' +
                  '<div class="colorStepper-value"></div>' +
                  '<button type="button" class="btn-plus" ng-click="increment()" ng-disabled="isOverMax()"></button>',
        scope:{
        },
        link: function(scope, iElement, iAttrs, ngModelController) {
            // Variables locales del componente
            scope.colorArray = [
                {colorName:'White',colorCode:'#FFFFFF'},
                {colorName:'Green',colorCode:'#32CD32'},
                {colorName:'Red',colorCode:'#FF4500'},
                {colorName:'Pink',colorCode:'#FF1493'},
                {colorName:'Black',colorCode:'#000000'},
                {colorName:'Blue',colorCode:'#4A616C'},
                {colorName:'Grey',colorCode:'#676061'}
            ];
            scope.selectedColorIndex = 0;
            scope.init = true;

            //Metodos locales del componente
            scope.decrement = function() {
                scope.setCurrentColor(-1);      //decrementa el valor del selected color
            };
            scope.increment = function() {
                scope.setCurrentColor(+1);      //Incrementa el valor del selected color
            };
            scope.isOverMin = function(){
                return 0 === scope.selectedColorIndex;      //revisa los margenes de los arreglos
            };
            scope.isOverMax = function(){
                return scope.selectedColorIndex === scope.colorArray.length-1;  //revisa el margen del arreglo
            };
            scope.setCurrentColor = function(offset){       //setea el selecterColor, en modelo de la vista asociado en el tpl
                scope.selectedColorIndex += offset;
                var currentColor = scope.colorArray[scope.selectedColorIndex];
                ngModelController.$setViewValue(currentColor);  //asociacion al ngmodel
                ngModelController.$render();            //render de la vista
            };
            //Se llama cada vez que se necesita hacer una actualizacion de la vista
            ngModelController.$render = function() {
                var currentColor = ngModelController.$viewValue;    //aqui agarramos el valor del ngmodel, igual podriamos agarrarlo del scope.
                iElement.find('div').text(currentColor.colorName);
                // Set internal index when loading for first time
                if (scope.init) {
                    for (var i = 0; i < scope.colorArray.length; i++) {
                        if (scope.colorArray[i].colorName == currentColor.colorName) {
                            scope.selectedColorIndex = i;
                        }
                    }
                    scope.init = false;
                }
            };
        }
    };
});