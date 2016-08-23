angular.module('thinkingVisually.editableText', [])


.directive('editableText',function($rootScope) {
    return {
        restrict: 'AE',
        require: 'ngModel',
        template:   '<div class="text-wrapper" ng-show="canEditText()">' +
                        '<input ng-show="showTitle()" class="title-text relative" type="input" placeholder="{{titlePlaceholder}}" ng-blur="changeToNormalMode()">' +
                        '<div class="relative text-edit-button" ng-click="changeToEditMode()">' +
                            '<textarea class="relative editable-text-input active-textarea" ng-show="isOnEditMode()" ng-blur="changeToNormalMode()" ng-keyup="checkMaxLength()"></textarea>' +
                            '<div class="absolute text-click-area" ng-hide="isOnEditMode()">' +
                                '<img class="exclamation-icon" ng-src="assets/img/exclamation_icon.png"><br/>' +
                                '<span>{{infoText}}</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' + 
                    '<div id="drop-area" class="drop-area" ng-click="$event.stopPropagation();">' + 
                        '<span ng-show="showTitle() && !canEditText()" class="title-text relative inline-block"></span>' +
                        '<input id="file-picker" type="file" ng-hide="true">' +
                        '<div class="relative">' +
                            '<textarea readonly class="relative editable-text-input inline-block" ng-hide="canEditText()"></textarea>' +
                            '<div class="relative inline-block can-upload-here" ng-click="browseImage()" ng-class="{\'orange-area\': showDropArea()}" ng-drop="canDragImage()" ng-drop-success="onDropSuccess($data, $event)">' +
                                '<img class="center-block exclamation-icon" ng-show="showDropArea()" ng-src="assets/img/exclamation_icon.png">' + 
                                '<span class="upper" ng-show="showDropArea()">Add Picture</span>' +
                                '<img id="displayImg" class="center-block" ng-show="showImage()">' + 
                                '<div id="svgwrapper"></div>' +
                                '<img src="assets/img/modal_close_btn.png" class="remove-btn top-right bring-front mini" ng-show="removeImageAllowed()" ng-click="deleteImage(); $event.stopPropagation();">' + 
                            '</div>' +
                        '</div>' +
                    '</div>',
        scope: {
            index: '=',
            textMode: '=',
            draggableMode: '=',
            titlePlaceholder: '=',
            infoText: '=',
            chartType: '='
        },        
        link: function(scope, iElement, iAttrs, ngModelController) {
            // Variables locales del componente
            scope.editMode = false;
            scope.requireMask = false; 
            scope.currentImage = '';
            scope.svgWrapper = null;
            scope.svgMask = '';

            scope.checkMaxLength = function(){
                var $_textarea = iElement.find('textarea')[0];
                var scrollHeight = $_textarea.scrollHeight;
                var actualHeight = $_textarea.offsetHeight;
                while (actualHeight < scrollHeight) {
                    $_textarea.value = $_textarea.value.substring(0, $_textarea.value.length-1);
                    scrollHeight = $_textarea.scrollHeight;
                    actualHeight = $_textarea.offsetHeight;
                }
            };

            scope.canEditText = function(){
                return angular.isDefined(scope.textMode) && scope.textMode;
            };

            scope.canDragImage = function(){
                return angular.isDefined(scope.draggableMode) && scope.draggableMode;
            };            

            //Metodos locales del componente
            scope.changeToEditMode = function() {
                if(!scope.editMode){
                    scope.editMode = true;
                    setTimeout(function() {
                        ngModelController.$render();
                        iElement.find('textarea')[0].focus();
                    }, 100);
                }
            };
            scope.changeToNormalMode = function(){
                scope.editMode = false;
                scope.checkMaxLength();
                scope.updateModel();
            };
            scope.isOnEditMode = function(){
                if(scope.editMode){
                    return true;
                }else{
                    var model = ngModelController.$viewValue;
                    if(model.bodyText === ""){
                        return false;
                    }
                    else{
                        return true;
                    }
                }
            };
            scope.updateModel = function(){
                var element = iElement.find('textarea')[0];
                element.value = element.value.trim();
                var model = ngModelController.$viewValue;
                model.bodyText = element.value; 
                element = iElement.find('input')[0];
                element.value = element.value.trim();
                model.titleText = element.value;
                ngModelController.$setViewValue(model);
                ngModelController.$render();
            };
            //Se llama cada vez que se necesita hacer una actualizacion de la vista
            ngModelController.$render = function() {
                var model = ngModelController.$viewValue;

                var element = iElement.find('textarea')[0];
                element.value = model.bodyText;

                element = iElement.find('input')[0];
                element.value = model.titleText;

                element = iElement.find('span')[1];
                element.innerText = model.titleText;
                element.textContent = model.titleText;

                // element = iElement.find('span')[2];
                element = iElement.find('textarea')[1];
                element.value = model.bodyText;
                // element.innerText = model.bodyText.replace(/\n/g, '<br />');
                // element.textContent = model.bodyText.replace(/\n/g, '<br />');
                // element.html(model.bodyText.replace(/\n/g, '<br />'));

                if (model.backgroundImg != null) {
                    element = iElement.find('#displayImg')[0];
                    if (model.backgroundImg.slice(0, 5) === 'data:') {
                        element.src = scope.currentImage = model.backgroundImg;
                    } else {
                        element.src = scope.currentImage = 'assets/img/gallery/' + model.backgroundImg;
                    }
                    // set mask for venn or cause-effect charts
                    if(scope.checkRequireMask()) {
                        element.setAttribute('style', 'display: none');
                        var i = setTimeout(scope.initSvgElement, 300);
                    }
                }else{
                    element.src = '';
                }
            };

            /* Called on document load */
            scope.initSvgElement = function (){
                // initialize svg element
                if(scope.svgWrapper === null) {
                    var thisClass = iElement.context.className;
                    thisClass = '.'+thisClass.replace(/ /g,'.');
                    scope.svgWrapper = $(thisClass+' #svgwrapper');
                    /*var tmpElem = iElement.find('#svgwrapper')[0];
                    tmpElem.setAttribute('class', 'currentSVG');
                    scope.svgWrapper = $('.currentSVG');
                    tmpElem.setAttribute('class', '');*/
                    if (scope.svgWrapper != null) {
                        scope.svgWrapper.svg();
                    }
                }
                scope.loadSvg();
            };

            /* Callback after loading external document */ 
            scope.loadSvgDone = function (svg, error) { 
                // set the image size from svg props
                svg.image(0, 0, svg.width(), svg.height(), scope.currentImage, {mask: scope.svgMask}); 
                //resetSize(svg); 
            };

            /* http://keith-wood.name/svg.html */
            scope.loadSvg = function() { 
                // load the mask based on the node type
                if(scope.svgWrapper !== null){
                    var svgFile = "";
                    if (scope.chartType === "venn") {
                        switch (iElement.context.id){
                            case 'stx-2-element0':
                                svgFile = "assets/mask/venn2-mask1.svg";
                                scope.svgMask = 'url(#mask1)';
                                break;
                            case 'stx-2-element2':
                                svgFile = "assets/mask/venn2-mask2.svg";
                                scope.svgMask = 'url(#mask2)';
                                break;
                            case 'stx-3-element0':
                                svgFile = "assets/mask/venn3-mask1.svg";
                                scope.svgMask = 'url(#mask1)';
                                break;
                            case 'stx-3-element2':
                                svgFile = "assets/mask/venn3-mask2.svg";
                                scope.svgMask = 'url(#mask2)';
                                break;
                            case 'stx-3-element3':
                                svgFile = "assets/mask/venn3-mask3.svg";
                                scope.svgMask = 'url(#mask3)';
                                break;
                        }
                    } else {
                        switch (iElement.context.id){
                            case 'stx-1-element0':
                                svgFile = "assets/mask/cause-effect1-mask1.svg";
                                scope.svgMask = 'url(#mask1)';
                                break;
                            case 'stx-1-element1':
                                svgFile = "assets/mask/cause-effect1-mask2.svg";
                                scope.svgMask = 'url(#mask2)';
                                break;
                            default:
                                svgFile = "";
                                scope.svgMask = '';
                                break;
                        }
                    }
                    if(svgFile !== "") {
                        var svg = scope.svgWrapper.svg('get');
                        svg.load(svgFile, {addTo: false, 
                            changeSize: true, onLoad: scope.loadSvgDone});
                    } else {
                        var image = iElement.find('#displayImg')[0];
                        image.setAttribute('style', 'display: inherit');
                        if (scope.svgWrapper != null) {
                            scope.svgWrapper.hide();
                        }
                    }
                }
            };
           
            scope.onDropSuccess = function(data, evt){
                if(data !== null) { 
                    $rootScope.$broadcast('dropAssetEvent');
                    var model = ngModelController.$viewValue;
                    // TODO eval chart type and node
                    var dropImagePath = scope.getImagePath(data);
                    model.backgroundImg = dropImagePath;
                    scope.editMode = false;
                    ngModelController.$setViewValue(model);
                    ngModelController.$render();
                }
            };

            scope.getImagePath = function(data){
                var imgPath = "";
                var chartFolder = "";
                var boxes = $rootScope.currentProject.getChartBoxes();
                switch ($rootScope.currentProject.getChartType()){
                  case 'organizational':
                    var rows = $rootScope.currentProject.getChartRows();
                    chartFolder = 'Organizational_Chart_4C'+ ((scope.index===0)? '2' : rows);
                    break;
                  case 'topic':
                    chartFolder = 'Topic_Chart';
                    break;        
                  case 'cause-effect':
                    // one or two boxes use same folder
                    chartFolder = 'Cause_effect_4B' + ((boxes<3)? '2' : '3');
                    // even elements are setup at the top arrow, odds go down
                    chartFolder = chartFolder + ((scope.index%2 === 0)? '_Top_Arrow' : '_Bottom_Box');
                    break;
                  case 'venn':
                    chartFolder = 'Venn_Diagram_4F'+ boxes +'_Circles'+ ((scope.index===0 && boxes===3)? '_s2' : '');
                    break;
                  case 'plot':
                    chartFolder = 'Timeline_Chart_2E5_2E6_2E7';
                    break;
                  case 'timeline':
                    chartFolder = 'Timeline_Chart_2E5_2E6_2E7';
                    break;
                }
                imgPath = data.category + '/' + chartFolder + '/' + data.image;
                return imgPath;
            };

            scope.checkRequireMask = function(){
                scope.requireMask = false;
                // chartType comes from the parent component as it might be a saved session
                switch ( scope.chartType ){
                  case 'cause-effect':
                  case 'venn':
                    scope.requireMask = true; 
                    break;
                  default:
                    scope.requireMask = false; 
                    break;
                }
                return scope.requireMask;
            };

            scope.showImage = function(){
                var model = ngModelController.$viewValue;
                return model.backgroundImg != null;
            };

            scope.removeImageAllowed = function(){
                var model = ngModelController.$viewValue;
                return (model.backgroundImg != null && scope.canDragImage());
            };

            scope.showDropArea = function(){
                var model = ngModelController.$viewValue;
                return ((model.backgroundImg == null) && scope.canDragImage());
            };    

            scope.showTitle = function(){
                return angular.isDefined(scope.titlePlaceholder) && scope.titlePlaceholder !== '';
            };

            scope.deleteImage = function(){
                var model = ngModelController.$viewValue;
                model.backgroundImg = null;
                if(scope.svgWrapper !== null){
                    scope.svgWrapper.svg('get').clear();
                }
                ngModelController.$setViewValue(model);
                ngModelController.$render();
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
                        var model = ngModelController.$viewValue;
                        // TODO eval chart type and node
                        model.backgroundImg = reader.result;
                        scope.editMode = false;
                        ngModelController.$setViewValue(model);
                        ngModelController.$render();
                        scope.$apply();
                    }, false);
                    reader.readAsDataURL(file);
                };
                picker[0].addEventListener('change', fn);
                picker.click();
            };
        }
    };
});
