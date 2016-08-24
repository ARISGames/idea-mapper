angular.module('templates-app', ['charts/cause-effect/cause-effect-workArea.tpl.html', 'charts/charts.tpl.html', 'charts/organizational/organizational-workArea.tpl.html', 'charts/plot/plot-workArea.tpl.html', 'charts/timeline/timeline-workArea.tpl.html', 'charts/topic/topic-workArea.tpl.html', 'charts/venn/venn-workArea.tpl.html', 'components/popups/chartHelpPopup.tpl.html', 'components/popups/helpPopup.tpl.html', 'components/popups/introPopup.tpl.html', 'components/popups/printHelpPopup.tpl.html', 'components/popups/resetPopup.tpl.html', 'components/popups/welcomePopup.tpl.html', 'examples/examples.tpl.html', 'examples/partials/example.tpl.html', 'header.tpl.html', 'step1/step1.detail.tpl.html', 'step1/step1.home.tpl.html', 'step1/step1.tpl.html', 'step2/step2.tpl.html', 'step3/step3.tpl.html', 'step4/step4.tpl.html', 'step5/partials/linkit-modal.tpl.html', 'step5/partials/mailit-modal.tpl.html', 'step5/step5.tpl.html']);

angular.module("charts/cause-effect/cause-effect-workArea.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("charts/cause-effect/cause-effect-workArea.tpl.html",
    "<div>\n" +
    "	<div class=\"cause-effect-chart\">\n" +
    "\n" +
    "		<div drop-area ng-show=\"$state.includes('step4')\" draggable-mode=\"$state.includes('step4')\" class=\"absolute bg-drop-area\" ng-model=\"chart.backgroundImg\"></div>\n" +
    "		\n" +
    "		<input ng-model=\"currentProject.chart.titleText\" ng-show=\"$state.includes('step3') || $state.includes('step4') || $state.includes('step5') || $state.includes('charts')\" class=\"absolute work-area-title-text tc-{{currentProject.chart.titleColor.colorName}}\" ng-class=\"{'work-area-title-box': $state.includes('step3')}\" size=\"40\" type=\"input\" ng-attr-placeholder=\"{{$state.includes('step3')? 'Chart title' : ''}}\" maxlength=\"40\">\n" +
    "		<div ng-hide=\"$state.includes('step3')\" class=\"absolute work-area-title-lock\"></div>\n" +
    "\n" +
    "		<div class=\"step2-work-area-chart relative\">\n" +
    "			<img ng-src=\"assets/img/cause-effect_chart_{{currentProject.chart.boxesNum}}.png\" class=\"center-block relative\">\n" +
    "\n" +
    "			<div class=\"absolute labels-components-wrapper\" ng-show=\"$state.includes('step2')\">\n" +
    "				<span ng-repeat=\"label in chartLabels\" class=\"absolute {{label.cls}}\">{{label.infoText}}</span>\n" +
    "			</div>			\n" +
    "\n" +
    "			<div class=\"absolute text-components-wrapper\">\n" +
    "				<div class=\"relative tc-{{currentProject.chart.titleColor.colorName}} bc-{{currentProject.chart.bodyColor.colorName}}\">\n" +
    "					<div  id=\"{{a.cls}}\" editable-text text-mode=\"$state.includes('step3')\" draggable-mode=\"$state.includes('step4')\" ng-repeat=\"a in getTextContent()\" class=\"absolute {{a.cls}} step{{currentProject.currentStep}}\" ng-model=\"a.model\" title-placeholder=\"a.titlePlaceholder\" info-text=\"a.infoText\" index=\"a.index\" chart-type=\"currentProject.chart.chartType.type\">\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("charts/charts.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("charts/charts.tpl.html",
    "<div class=\"row\">\n" +
    "	<div id=\"work-area\" class=\"work-area col-sm-9 col-sm-offset-1 paper chart-frame\" ui-view></div>\n" +
    "</div>");
}]);

angular.module("charts/organizational/organizational-workArea.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("charts/organizational/organizational-workArea.tpl.html",
    "<div>\n" +
    "	<div class=\"organizational-chart\">\n" +
    "\n" +
    "		<div drop-area ng-show=\"$state.includes('step4')\" draggable-mode=\"$state.includes('step4')\" class=\"absolute bg-drop-area\" ng-model=\"chart.backgroundImg\"></div>\n" +
    "\n" +
    "		<input ng-model=\"currentProject.chart.titleText\" ng-show=\"$state.includes('step3') || $state.includes('step4') || $state.includes('step5') || $state.includes('charts')\" class=\"absolute work-area-title-text tc-{{currentProject.chart.titleColor.colorName}}\" ng-class=\"{'work-area-title-box': $state.includes('step3')}\" size=\"40\" type=\"input\" ng-attr-placeholder=\"{{$state.includes('step3')? 'Chart title' : ''}}\" maxlength=\"40\">\n" +
    "		<div ng-hide=\"$state.includes('step3')\" class=\"absolute work-area-title-lock\"></div>\n" +
    "\n" +
    "		<div class=\"step2-work-area-chart relative\">\n" +
    "\n" +
    "			<img ng-src=\"assets/img/organizational_chart_{{currentProject.chart.rows}}x{{currentProject.chart.splits}}.png\" class=\"center-block relative\">\n" +
    "\n" +
    "			<div class=\"absolute labels-components-wrapper\" ng-show=\"$state.includes('step2')\">\n" +
    "				<span ng-repeat=\"label in chartLabels\" class=\"absolute {{label.cls}}\">{{label.infoText}}</span>\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"absolute text-components-wrapper\">\n" +
    "				<div class=\"relative tc-{{currentProject.chart.titleColor.colorName}} bc-{{currentProject.chart.bodyColor.colorName}}\">\n" +
    "					<div editable-text text-mode=\"$state.includes('step3')\" draggable-mode=\"$state.includes('step4')\" ng-repeat=\"a in getTextContent()\" class=\"absolute {{a.cls}} step{{currentProject.currentStep}}\" ng-model=\"a.model\" title-placeholder=\"a.titlePlaceholder\" info-text=\"a.infoText\" index=\"a.index\" chart-type=\"currentProject.chart.chartType.type\">\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			\n" +
    "		</div>\n" +
    "		\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("charts/plot/plot-workArea.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("charts/plot/plot-workArea.tpl.html",
    "<div>\n" +
    "	<div class=\"plot-chart\">\n" +
    "\n" +
    "		<div drop-area ng-show=\"$state.includes('step4')\" draggable-mode=\"$state.includes('step4')\" class=\"absolute bg-drop-area\" ng-model=\"chart.backgroundImg\"></div>\n" +
    "		\n" +
    "		<input ng-model=\"currentProject.chart.titleText\" ng-show=\"$state.includes('step3') || $state.includes('step4') || $state.includes('step5') || $state.includes('charts')\" class=\"absolute work-area-title-text tc-{{currentProject.chart.titleColor.colorName}}\" ng-class=\"{'work-area-title-box': $state.includes('step3')}\" size=\"40\" type=\"input\" ng-attr-placeholder=\"{{$state.includes('step3')? 'Chart title' : ''}}\" maxlength=\"40\">\n" +
    "		<div ng-hide=\"$state.includes('step3')\" class=\"absolute work-area-title-lock\"></div>\n" +
    "\n" +
    "		<div class=\"step2-work-area-chart relative\">\n" +
    "			<img ng-src=\"assets/img/plot_chart_{{currentProject.chart.boxesNum}}.png\" class=\"center-block relative\">\n" +
    "\n" +
    "			<div class=\"absolute labels-components-wrapper\" ng-show=\"$state.includes('step2')\">\n" +
    "				<span ng-repeat=\"label in chartLabels\" class=\"absolute {{label.cls}}\">{{label.infoText}}</span>\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"absolute text-components-wrapper\">\n" +
    "				<div class=\"relative tc-{{currentProject.chart.titleColor.colorName}} bc-{{currentProject.chart.bodyColor.colorName}}\">\n" +
    "					<div editable-text text-mode=\"$state.includes('step3')\" draggable-mode=\"$state.includes('step4')\" ng-repeat=\"a in getTextContent()\" class=\"absolute {{a.cls}} step{{currentProject.currentStep}}\" ng-model=\"a.model\" title-placeholder=\"a.titlePlaceholder\" info-text=\"a.infoText\" chart-type=\"currentProject.chart.chartType.type\">\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("charts/timeline/timeline-workArea.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("charts/timeline/timeline-workArea.tpl.html",
    "<div>\n" +
    "	<div class=\"timeline-chart\">\n" +
    "\n" +
    "		<div drop-area ng-show=\"$state.includes('step4')\" draggable-mode=\"$state.includes('step4')\" class=\"absolute tl-{{currentProject.chart.boxesNum}}-boxes bg-drop-area\" ng-model=\"chart.backgroundImg\"></div>\n" +
    "\n" +
    "		<input ng-model=\"currentProject.chart.titleText\" ng-show=\"$state.includes('step3') || $state.includes('step4') || $state.includes('step5') || $state.includes('charts')\" class=\"absolute work-area-title-text tc-{{currentProject.chart.titleColor.colorName}}\" ng-class=\"{'work-area-title-box': $state.includes('step3')}\" size=\"40\" type=\"input\" ng-attr-placeholder=\"{{$state.includes('step3')? 'Chart title' : ''}}\" maxlength=\"40\">\n" +
    "		<div ng-hide=\"$state.includes('step3')\" class=\"absolute work-area-title-lock\"></div>\n" +
    "\n" +
    "		<div class=\"step2-work-area-chart relative\">\n" +
    "			<img ng-src=\"assets/img/timeline_chart_{{currentProject.chart.boxesNum}}.png\" class=\"center-block relative\">\n" +
    "\n" +
    "			<div class=\"absolute labels-components-wrapper\" ng-show=\"$state.includes('step2')\">\n" +
    "				<span ng-repeat=\"label in chartLabels\" class=\"absolute {{label.cls}}\">{{label.infoText}}</span>\n" +
    "			</div>			\n" +
    "\n" +
    "			<div class=\"absolute text-components-wrapper\">\n" +
    "				<div class=\"relative tc-{{currentProject.chart.titleColor.colorName}} bc-{{currentProject.chart.bodyColor.colorName}}\">\n" +
    "					<div editable-text text-mode=\"$state.includes('step3')\" draggable-mode=\"$state.includes('step4')\" ng-repeat=\"a in getTextContent()\" class=\"absolute {{a.cls}} step{{currentProject.currentStep}}\" ng-model=\"a.model\" title-placeholder=\"a.titlePlaceholder\" info-text=\"a.infoText\" chart-type=\"currentProject.chart.chartType.type\">\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("charts/topic/topic-workArea.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("charts/topic/topic-workArea.tpl.html",
    "<div>\n" +
    "	<div class=\"topic-chart\">\n" +
    "		\n" +
    "		<div drop-area ng-show=\"$state.includes('step4')\" draggable-mode=\"$state.includes('step4')\" class=\"absolute bg-drop-area\" ng-model=\"chart.backgroundImg\"></div>\n" +
    "\n" +
    "		<input ng-model=\"currentProject.chart.titleText\" ng-show=\"$state.includes('step3') || $state.includes('step4') || $state.includes('step5') || $state.includes('charts')\" class=\"absolute work-area-title-text tc-{{currentProject.chart.titleColor.colorName}}\" ng-class=\"{'work-area-title-box': $state.includes('step3')}\" size=\"40\" type=\"input\" ng-attr-placeholder=\"{{$state.includes('step3')? 'Chart title' : ''}}\" maxlength=\"40\">\n" +
    "		<div ng-hide=\"$state.includes('step3')\" class=\"absolute work-area-title-lock\"></div>\n" +
    "\n" +
    "		<div class=\"step2-work-area-chart relative\">\n" +
    "			\n" +
    "			<img ng-src=\"assets/img/topic_chart_{{currentProject.chart.boxesNum}}.png\" class=\"center-block relative\">\n" +
    "			\n" +
    "			<div class=\"absolute labels-components-wrapper\" ng-show=\"$state.includes('step2')\">\n" +
    "				<span ng-repeat=\"label in chartLabels\" class=\"absolute {{label.cls}}\">{{label.infoText}}</span>\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"absolute text-components-wrapper\">\n" +
    "				<div class=\"relative tc-{{currentProject.chart.titleColor.colorName}} bc-{{currentProject.chart.bodyColor.colorName}}\">\n" +
    "					<div editable-text text-mode=\"$state.includes('step3')\" draggable-mode=\"$state.includes('step4')\" ng-repeat=\"a in getTextContent()\" class=\"absolute {{a.cls}} step{{currentProject.currentStep}}\" ng-model=\"a.model\" title-placeholder=\"a.titlePlaceholder\" info-text=\"a.infoText\" chart-type=\"currentProject.chart.chartType.type\">\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("charts/venn/venn-workArea.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("charts/venn/venn-workArea.tpl.html",
    "<div>\n" +
    "	<div class=\"venn-chart\">\n" +
    "\n" +
    "		<div drop-area ng-show=\"$state.includes('step4')\" draggable-mode=\"$state.includes('step4')\" class=\"absolute bg-drop-area\" ng-model=\"chart.backgroundImg\"></div>\n" +
    "\n" +
    "		<input ng-model=\"currentProject.chart.titleText\" ng-show=\"$state.includes('step3') || $state.includes('step4') || $state.includes('step5') || $state.includes('charts')\" class=\"absolute work-area-title-text tc-{{currentProject.chart.titleColor.colorName}}\" ng-class=\"{'work-area-title-box': $state.includes('step3')}\" size=\"40\" type=\"input\" ng-attr-placeholder=\"{{$state.includes('step3')? 'Chart title' : ''}}\">\n" +
    "		<div ng-hide=\"$state.includes('step3')\" class=\"absolute work-area-title-lock\"></div>\n" +
    "\n" +
    "		<div class=\"step2-work-area-chart relative\">\n" +
    "			<img ng-src=\"assets/img/venn_chart_{{currentProject.chart.boxesNum}}.png\" class=\"center-block relative\">\n" +
    "\n" +
    "			<div class=\"absolute labels-components-wrapper\" ng-show=\"$state.includes('step2')\">\n" +
    "				<span ng-repeat=\"label in chartLabels\" class=\"absolute {{label.cls}}\">{{label.infoText}}</span>\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"absolute text-components-wrapper\">\n" +
    "				<div class=\"relative tc-{{currentProject.chart.titleColor.colorName}} bc-{{currentProject.chart.bodyColor.colorName}}\">\n" +
    "					<div id=\"{{a.cls}}\" name=\"editBox\" editable-text text-mode=\"$state.includes('step3')\" draggable-mode=\"$state.includes('step4')\" ng-repeat=\"a in getTextContent()\" class=\"absolute {{a.cls}} step{{currentProject.currentStep}}\" ng-model=\"a.model\" title-placeholder=\"a.titlePlaceholder\" info-text=\"a.infoText\" index=\"a.index\" chart-type=\"currentProject.chart.chartType.type\">\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("components/popups/chartHelpPopup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/popups/chartHelpPopup.tpl.html",
    "<div class=\"popup relative\">\n" +
    "	<img src=\"assets/img/modal_bg.png\" class=\"popup-bg\">\n" +
    "	<div class=\"relative text-center\">\n" +
    "		<div class=\"title\">Help for {{chartName}}</div>\n" +
    "		<div class=\"instructions\">\n" +
    "			<img src=\"assets/img/modal_make_link_field_bg.png\" class=\"instructions-bg\">\n" +
    "			<div class=\"relative\">\n" +
    "				<p class='help-ph' ng-repeat=\"e in helpText\">\n" +
    "					{{e}}\n" +
    "				</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"footer voffset4\">\n" +
    "			<div class=\"relative tv-button\" ng-click=\"close()\">\n" +
    "				<img src=\"assets/img/ok_btn.png\">\n" +
    "				<label class=\"fs-30 voffset3\">Okay</label>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<img src=\"assets/img/modal_close_btn.png\" class=\"popup-close\" ng-click=\"close()\">\n" +
    "</div>");
}]);

angular.module("components/popups/helpPopup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/popups/helpPopup.tpl.html",
    "<div class=\"popup relative\">\n" +
    "	<img src=\"assets/img/modal_bg.png\" class=\"popup-bg\">\n" +
    "	<div class=\"relative upper text-center\">\n" +
    "		<div class=\"title\">HELP</div>\n" +
    "		<div class=\"content\">Are you stuck or not sure what to do?<br/></div>\n" +
    "		<div class=\"instructions\">\n" +
    "			<img src=\"assets/img/modal_make_link_field_bg.png\" class=\"instructions-bg\">\n" +
    "			<ol class=\"relative\">\n" +
    "				<li>First choose a chart and adjust it.</li>\n" +
    "				<li>Then add text and pictures. You can switch back and forth between the two.</li>\n" +
    "				<li>If you need more ideas, click Return to Stories to read or watch the story again.</li>\n" +
    "				<li>Click Done to email, print or link your graphic organizer.</li>\n" +
    "			</ol>\n" +
    "		</div>\n" +
    "		<div class=\"footer\">\n" +
    "			If you&#39;ve done all this and are still stuck, ask your teacher or a friend if they can help you.\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<img src=\"assets/img/modal_close_btn.png\" class=\"popup-close\" ng-click=\"close()\">\n" +
    "</div>");
}]);

angular.module("components/popups/introPopup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/popups/introPopup.tpl.html",
    "<div class=\"popup relative\">\n" +
    "	<img src=\"assets/img/modal_bg.png\" class=\"popup-bg\">\n" +
    "	<div class=\"relative upper text-center fs-18\">\n" +
    "		<div class=\"content blue-font\">\n" +
    "			<p>\n" +
    "				Graphic organizers help us organize information so that we can better understand and remember what we learn.\n" +
    "			</p>\n" +
    "			<br>\n" +
    "			<p>\n" +
    "				Use the graphic organizers in this activity to analyze the information you learned from	\n" +
    "			</p>\n" +
    "		</div>\n" +
    "		<div class=\"black-italic-title\">Wisconsin Biographies’ stories</div>\n" +
    "		<div class=\"footer voffset4\">\n" +
    "			<div class=\"relative tv-button\" ng-click=\"close()\">\n" +
    "				<img src=\"assets/img/ok_btn.png\">\n" +
    "				<label class=\"fs-30 voffset3\">Next</label>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("components/popups/printHelpPopup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/popups/printHelpPopup.tpl.html",
    "<div class=\"popup relative\">\n" +
    "	<img src=\"assets/img/modal_bg.png\" class=\"popup-bg\">\n" +
    "	<div class=\"relative text-center\">\n" +
    "		<div class=\"title fs-56\">Print Unable</div>\n" +
    "		<div class=\"instructions blue-font fs-30\">\n" +
    "			<p>Please consider switching to another browser like Mozilla Firefox in order to print this page.</p>\n" +
    "		</div>\n" +
    "		<div class=\"footer voffset4\">\n" +
    "			<div class=\"relative tv-button\" ng-click=\"close()\">\n" +
    "				<img src=\"assets/img/ok_btn.png\">\n" +
    "				<label class=\"fs-30 voffset3\">Yes</label>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<img src=\"assets/img/modal_close_btn.png\" class=\"popup-close\" ng-click=\"close()\">\n" +
    "</div>");
}]);

angular.module("components/popups/resetPopup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/popups/resetPopup.tpl.html",
    "<div class=\"popup relative\">\n" +
    "	<img src=\"assets/img/modal_bg.png\" class=\"popup-bg\">\n" +
    "	<div class=\"relative text-center\">\n" +
    "		<div class=\"title fs-56\">Are you sure?</div>\n" +
    "		<div class=\"instructions blue-font fs-30\">\n" +
    "			<p>Clicking Back to select chart will delete your current progress.</p>\n" +
    "		</div>\n" +
    "		<div class=\"footer voffset4\">\n" +
    "			<div class=\"relative tv-button\" ng-click=\"resetProject()\">\n" +
    "				<img src=\"assets/img/ok_btn.png\">\n" +
    "				<label class=\"fs-30 voffset3\">Yes</label>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<img src=\"assets/img/modal_close_btn.png\" class=\"popup-close\" ng-click=\"close()\">\n" +
    "</div>");
}]);

angular.module("components/popups/welcomePopup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/popups/welcomePopup.tpl.html",
    "<div class=\"popup relative\">\n" +
    "	<img src=\"assets/img/modal_bg.png\" class=\"popup-bg\">\n" +
    "	<div class=\"relative upper text-center\">\n" +
    "		<div class=\"title fs-56\">Welcome</div>\n" +
    "		<div class=\"title fs-36\">enter your name</div>\n" +
    "		<div class=\"instructions\">\n" +
    "			<img src=\"assets/img/modal_make_link_field_bg.png\" class=\"instructions-bg\">\n" +
    "			<input class=\"clear-textfield relative\" type=\"text\" ng-model=\"currentProject.studentName\">\n" +
    "		</div>\n" +
    "		<div class=\"footer\">\n" +
    "			<div class=\"relative tv-button\" ng-click=\"close()\">\n" +
    "				<img src=\"assets/img/ok_btn.png\">\n" +
    "				<label class=\"fs-30 voffset3\">OK!</label>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("examples/examples.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("examples/examples.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-sm-9\" ui-view></div>\n" +
    "\n" +
    "	<div class=\"col-sm-3 submenu-component-example\">\n" +
    "		<header class=\"text-center title\">Finished Examples</header>\n" +
    "		<div id=\"menu-wrapper\">\n" +
    "	      <ul class=\"nav nav-list\">\n" +
    "	        <!-- This <li> will only add the 'active' class if 'step1.detail' or its descendants are active\n" +
    "	             AND if it is the link for the active chartType (aka chartTypetId) -->\n" +
    "	        <li ng-repeat=\"example in examplesList\">\n" +
    "	          <!-- Here's a ui-sref that is also providing necessary parameters -->\n" +
    "	          <div ui-sref=\"examples.detail({exampleId:example.id})\" class=\"menu-item relative\" ui-sref-active=\"active\">\n" +
    "	          	<img ng-src=\"assets/img/examples/{{example.thumb}}\" class=\"relative\">\n" +
    "	          </div>\n" +
    "	        </li>\n" +
    "	      </ul>\n" +
    "	    </div>\n" +
    "		  <div class=\"examples_go_back_btn voffset2\">\n" +
    "			<button type=\"button\" class=\"btn\" ng-click=\"goToStep(currentProject.currentStep)\">Go Back</button>\n" +
    "		  </div>	    	    \n" +
    "	</div>		 \n" +
    "</div>\n" +
    "");
}]);

angular.module("examples/partials/example.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("examples/partials/example.tpl.html",
    "<img ng-src=\"assets/img/examples/{{exampleFile}}\" class=\"relative img-responsive\">");
}]);

angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "<div id=\"header\" class=\"row\">\n" +
    "  <div class=\"col-sm-2\">\n" +
    "    <img id=\"logo\" src=\"assets/img/logo.png\" alt=\"Thinking Visually\">\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-3\">\n" +
    "    <h1>Idea Mapper <span>A Graphic Organizer Creator</span></h1>\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-5\">\n" +
    "    <div class=\"paperclipped\">\n" +
    "      <div ng-hide='$state.includes(\"charts\")'>{{getStudentChartTitle()}}</div>\n" +
    "      <div ng-show='$state.includes(\"charts\")'>{{username}}</div>\n" +
    "    </div>\n" +
    "  </div>  \n" +
    "  <div class=\"col-sm-2\">\n" +
    "    <div class=\"teaching-tips\">\n" +
    "      <a class=\"btn green-btn teaching-tips-link center-text\" href=\"#/teaching-tips\" ng-hide=\"$state.includes('charts')\">Teaching Tips</a>\n" +
    "    </div>\n" +
    "    <div class=\"header-help\">\n" +
    "      <a class=\"btn green-btn help-link\" ng-hide=\"$state.includes('charts')\" ng-click=\"popupManager.showChartHelpPopup()\">Help</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div id=\"topnav\" class=\"row\" ng-hide=\"$state.includes('charts')\">\n" +
    "    <ul class=\"nav navbar-nav navigation-bar\">\n" +
    "        <li id=\"tab1\" class=\"tab\" ng-class=\"{active: $state.includes('step1'), disabled: $state.includes('examples')}\">\n" +
    "          <a href ng-click=\"goToStep(1)\">\n" +
    "            SELECT CHART\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li id=\"tab2\" class=\"tab\" ng-class=\"{active: $state.includes('step2'), disabled: ($state.includes('step1.reset') || $state.includes('step1.home') || $state.includes('examples'))}\">\n" +
    "          <a href ng-click=\"goToStep(2)\">\n" +
    "            ADJUST<br/>CHART\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li id=\"tab3\" class=\"tab\" ng-class=\"{active: $state.includes('step3'), disabled: ($state.includes('step1.home') || $state.includes('examples') || currentProject.maxStep<2 )}\">\n" +
    "          <a href ng-click=\"goToStep(3)\">\n" +
    "            ADD<br/>TEXT\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li id=\"tab4\" class=\"tab\" ng-class=\"{active: $state.includes('step4'), disabled: ($state.includes('step1.home') || $state.includes('examples') || currentProject.maxStep<2 )}\">\n" +
    "          <a href ng-click=\"goToStep(4)\">\n" +
    "            ADD <br/>PICTURES\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li id=\"tab5\" class=\"tab\" ng-class=\"{active: $state.includes('step5'), disabled: ($state.includes('step1.home') || $state.includes('examples') || currentProject.maxStep<4 )}\">\n" +
    "          <a href ng-click=\"goToStep(5)\">\n" +
    "            DONE\n" +
    "          </a>\n" +
    "        </li>            \n" +
    "    </ul>\n" +
    "</div> \n" +
    "");
}]);

angular.module("step1/step1.detail.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("step1/step1.detail.tpl.html",
    "<div class=\"relative\">\n" +
    "	<img ng-src=\"assets/img/{{currentProject.getChartType()}}_chart.png\" class=\"center-block\">\n" +
    "\n" +
    "	<div class=\"absolute labels-components-wrapper\">\n" +
    "		<span ng-repeat=\"label in chartType.labels\" class=\"{{chartType.type}}-label{{$index+1}}\">{{label.infoText}}</span>\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("step1/step1.home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("step1/step1.home.tpl.html",
    "<div>\n" +
    "	<div class=\"row step1-home\">\n" +
    "		<div class=\"col-sm-2\">\n" +
    "			<img src=\"assets/img/select_arrow.png\">\n" +
    "		</div>\n" +
    "		<div class=\"col-sm-9\">Select type of chart from the left</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("step1/step1.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("step1/step1.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-sm-3 submenu-component-default\">\n" +
    "		<header class=\"upper text-center\">Chart Type</header>\n" +
    "		<div id=\"menu-wrapper\">\n" +
    "	      <ul class=\"nav nav-list\">\n" +
    "	        <!-- This <li> will only add the 'active' class if 'step1.detail' or its descendants are active\n" +
    "	             AND if it is the link for the active chartType (aka chartTypetId) -->\n" +
    "	        <li ng-repeat=\"chartType in chartTypes\">\n" +
    "	          <!-- Here's a ui-sref that is also providing necessary parameters -->\n" +
    "	          <div ui-sref=\"step1.detail({chartTypeId:chartType.id})\" class=\"menu-item relative\" ui-sref-active=\"active\">\n" +
    "	          	<p class=\"relative\">{{chartType.name}}</p>\n" +
    "	          	<img ng-src=\"assets/img/{{chartType.icon}}\" class=\"relative\">\n" +
    "	          	<img src=\"assets/img/check.png\" class=\"menu-check\">\n" +
    "	          	<span class=\"relative menu-selection-help\"><em>{{chartType.menuSelectionHelp}}</em></span>\n" +
    "	          </div>\n" +
    "	          <hr ng-hide=\"$last\">\n" +
    "	        </li>\n" +
    "	      </ul>\n" +
    "	    </div>\n" +
    "	</div>		 \n" +
    "	<div id=\"work-area\" class=\"work-area col-sm-9 paper animated step1-work-area-animation\" ui-view></div>\n" +
    "</div>");
}]);

angular.module("step2/step2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("step2/step2.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-sm-3 submenu-component-default submenu-component-step2\">\n" +
    "		<header class=\"text-center title\">{{chart.chartType.name}}</header>\n" +
    "\n" +
    "		<div id=\"menu-wrapper\" class=\"text-center\" ng-show=\"currentProject.getChartType()=='organizational'\">\n" +
    "			<div>\n" +
    "				<div>Number of<br>Rows:</div>\n" +
    "				<div min=\"2\" max=\"3\" numeric-stepper ng-model=\"currentProject.chart.rows\" class=\"voffset1\"></div>\n" +
    "			</div>\n" +
    "			<div class=\"voffset3\">\n" +
    "				<div>Number of<br>Branches:</div>\n" +
    "				<div min=\"1\" max=\"2\" numeric-stepper ng-model=\"currentProject.chart.splits\" class=\"voffset1\"></div>			\n" +
    "			</div>				\n" +
    "	    </div>\n" +
    "\n" +
    "	    <div id=\"menu-wrapper\" class=\"text-center\" ng-show=\"currentProject.getChartType()=='topic'\">\n" +
    "			<div>\n" +
    "				<div>Number of<br>Branches:</div>\n" +
    "				<div min=\"2\" max=\"4\" numeric-stepper ng-model=\"currentProject.chart.boxesNum\" class=\"voffset1\"></div>\n" +
    "			</div>		\n" +
    "	    </div>\n" +
    "\n" +
    "	    <div id=\"menu-wrapper\" class=\"text-center\" ng-show=\"currentProject.getChartType()=='cause-effect'\">\n" +
    "			<div>\n" +
    "				<div>Number of<br>Columns:</div>\n" +
    "				<div min=\"1\" max=\"3\" numeric-stepper ng-model=\"currentProject.chart.boxesNum\" class=\"voffset1\"></div>\n" +
    "			</div>		\n" +
    "	    </div>\n" +
    "\n" +
    "	    <div id=\"menu-wrapper\" class=\"text-center\" ng-show=\"currentProject.getChartType()=='venn'\">\n" +
    "			<div>\n" +
    "				<div>Number of<br>Circles:</div>\n" +
    "				<div min=\"2\" max=\"3\" numeric-stepper ng-model=\"currentProject.chart.boxesNum\" class=\"voffset1\"></div>\n" +
    "			</div>		\n" +
    "	    </div>\n" +
    "\n" +
    "	    <div id=\"menu-wrapper\" class=\"text-center\" ng-show=\"currentProject.getChartType()=='plot'\">\n" +
    "			<div>\n" +
    "				<div>Number of<br>Events:</div>\n" +
    "				<div min=\"3\" max=\"5\" numeric-stepper ng-model=\"currentProject.chart.boxesNum\" class=\"voffset1\"></div>\n" +
    "			</div>		\n" +
    "	    </div>\n" +
    "\n" +
    "	    <div id=\"menu-wrapper\" class=\"text-center\" ng-show=\"currentProject.getChartType()=='timeline'\">\n" +
    "			<div>\n" +
    "				<div>Number of<br>Events:</div>\n" +
    "				<div min=\"3\" max=\"8\" numeric-stepper ng-model=\"currentProject.chart.boxesNum\" class=\"voffset1\"></div>\n" +
    "			</div>		\n" +
    "	    </div>	    \n" +
    "\n" +
    "	</div>		    \n" +
    "	<div id=\"work-area\" class=\"work-area col-sm-9 paper slide\" ui-view></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("step3/step3.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("step3/step3.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-sm-3 submenu-component-default submenu-component-step3\">\n" +
    "		<header class=\"text-center title\">{{chart.chartType.name}}</header>\n" +
    "		<div id=\"menu-wrapper\" class=\"text-center\">\n" +
    "			<div>\n" +
    "				<span class=\"instructions\">Click on the<br>text box you<br>want to edit</span>\n" +
    "			</div>\n" +
    "			<div class=\"voffset2\">\n" +
    "				<span class='text-help'><em>{{chart.chartType.addTextHelp}}</em></span>\n" +
    "			</div>\n" +
    "			<div class=\"voffset3\">\n" +
    "				<div>Title Color:</div>\n" +
    "				<div color-stepper ng-model=\"currentProject.chart.titleColor\" class=\"voffset1\"></div>\n" +
    "			</div>\n" +
    "			<div class=\"voffset2\">\n" +
    "				<div>Body Color:</div>\n" +
    "				<div color-stepper ng-model=\"currentProject.chart.bodyColor\" class=\"voffset1\"></div>			\n" +
    "			</div>				\n" +
    "	    </div>\n" +
    "	</div>		    \n" +
    "	<div id=\"work-area\" class=\"work-area col-sm-9 paper slide\" ui-view></div>\n" +
    "</div>");
}]);

angular.module("step4/step4.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("step4/step4.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-sm-3 submenu-component-default submenu-component-step4 upper\">\n" +
    "		<header class=\"upper text-center\">Add Pictures</header>\n" +
    "		<div id=\"menu-wrapper\">\n" +
    "			<div class=\"accordion-container\">\n" +
    "				<accordion class=\"accordion\" close-others=\"true\">\n" +
    "					<accordion-group is-open=\"$parent.isOpen[$index]\" ng-repeat=\"category in imagesGallery\">\n" +
    "						<accordion-heading>\n" +
    "							<div id=\"{{category.name}}\" class=\"heading-box\" ng-click=\"headingClick($event)\"><img id=\"{{category.name}}_arrow\" ng-src=\"assets/img/open_btn.png\">{{category.name}}</div>\n" +
    "						</accordion-heading>\n" +
    "						<div class=\"drag-object\" ng-repeat=\"image in category.images\" >\n" +
    "							<img ng-src=\"assets/img/gallery/{{image.thumb}}\" class=\"center-block relative\">\n" +
    "			          		<div ng-drag=\"true\" ng-drag-data=\"image\"></div>\n" +
    "						</div>\n" +
    "				    </accordion-group>\n" +
    "				</accordion>\n" +
    "			</div>\n" +
    "		    <div ng-drag-clone=\"\">\n" +
    "		    	<img ng-src=\"assets/img/gallery/{{clonedData.thumb}}\" class=\"center-block relative\">\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>		    \n" +
    "	<div id=\"work-area\" class=\"work-area col-sm-9 paper slide\" ui-view></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("step5/partials/linkit-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("step5/partials/linkit-modal.tpl.html",
    "<div class=\"thinkingVisually-modal text-center\">\n" +
    "	<div class=\"modal-close-btn\">\n" +
    "		<button class=\"btn\" ng-click=\"close_linkit_modal()\"></button>\n" +
    "	</div>		\n" +
    "    <div class=\"modal-title\">make a link to<br>your chart</div>\n" +
    "	<div class=\"modal-btn modal-make-link-btn\">\n" +
    "		<button class=\"btn\" ng-click=\"make_link()\">Make Link</button>\n" +
    "	</div>\n" +
    "	<div class=\"link-box\"><textarea read-only>{{link_text}}</textarea></div>\n" +
    "</div>");
}]);

angular.module("step5/partials/mailit-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("step5/partials/mailit-modal.tpl.html",
    "<div class=\"thinkingVisually-modal text-center\">\n" +
    "	<div class=\"modal-close-btn\">\n" +
    "		<button class=\"btn\" ng-click=\"close_mailit_modal()\"></button>\n" +
    "	</div>		\n" +
    "    <div class=\"modal-title\">email your chart<br>send to:</div>\n" +
    "	<div class=\"link-box\">\n" +
    "		<form method=\"POST\" action=\"core/emailProject.php\" id=\"emailForm\" ng-submit=\"send_email()\">\n" +
    "    		<input type=\"hidden\" name=\"student\" id=\"student\" value=\"{{currentProject.studentName}}\" />\n" +
    "    		<input type=\"hidden\" name=\"url\" id=\"url\" value=\"\" />\n" +
    "			<input type=\"text\" name=\"email\" id=\"email\"/>\n" +
    "		</form>			\n" +
    "	</div>\n" +
    "	<div class=\"absolute modal-result\"><span>{{result_from_server}}</span></div>\n" +
    "	<div class=\"modal-btn modal-send-btn\">\n" +
    "		<button class=\"btn\" ng-click=\"send_email()\">send</button>\n" +
    "	</div>	\n" +
    "</div>");
}]);

angular.module("step5/step5.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("step5/step5.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-sm-3 submenu-component-step5 upper\">\n" +
    "		<div class=\"text-center\">\n" +
    "			<div class=\"title voffset4\">\n" +
    "				<span>Congratulations!<br>You completed<br>an idea map!</span>\n" +
    "			</div>\n" +
    "			<div class=\"sidebar_right_btn sidebar_right_btn1 voffset4\" ng-controller=\"ModalMailitCtrl\">\n" +
    "				<button type=\"button\" class=\"btn\" ng-disabled=\"uploadProgress\" ng-click=\"openMailitModal()\">Email it</button>\n" +
    "			</div>\n" +
    "			<div class=\"sidebar_right_btn sidebar_right_btn2 voffset3\" ng-controller=\"ModalLinkitCtrl\">\n" +
    "				<button type=\"button\" class=\"btn\" ng-disabled=\"uploadProgress\" ng-click=\"openPrintModal()\">Print it</button>\n" +
    "			</div>\n" +
    "			<div class=\"sidebar_right_btn sidebar_right_btn3 voffset3\" ng-controller=\"ModalLinkitCtrl\">\n" +
    "				<button type=\"button\" class=\"btn\" ng-disabled=\"uploadProgress\" ng-click=\"openLinkitModal()\">Link it</button>\n" +
    "			</div>			\n" +
    "			<div class=\"sidebar_right_btn4 voffset3\">\n" +
    "				<button type=\"button\" class=\"btn\" ng-disabled=\"uploadProgress\" ng-click=\"goToStep(1)\">Make another<br>idea map</button>\n" +
    "			</div>							\n" +
    "	    </div>\n" +
    "	</div>\n" +
    "	<div id=\"work-area\" class=\"work-area col-sm-9 paper slide\" ui-view></div>	    \n" +
    "</div>\n" +
    "<div class=\"waiting-modal\" ng-show=\"savingProcess\"><span>Saving image...</span></div>");
}]);
