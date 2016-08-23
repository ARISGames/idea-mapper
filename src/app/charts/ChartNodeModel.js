angular.module('thinkingVisually.charts.chartNode.model', [
])

.factory('ChartNode', function () {
 
  /**
   * Constructor, with class name
   */
  function ChartNode(titleText, bodyText, backgroundImg) {
    // Public properties, assigned to the instance ('this')
    this.titleText = titleText;
    this.bodyText = bodyText;
    this.backgroundImg = backgroundImg;
  }
 
  /**
   * Public method, assigned to prototype
   */
 
  /**
   * Static method, assigned to class
   * Instance ('this') is not available in static context
   */
  ChartNode.build = function (data) {
    if (data == null) {
      return null;
    }

    return new ChartNode(
      data.titleText,
      data.bodyText,
      data.backgroundImg
    );
  };
 
  /**
   * Return the constructor function
   */
  return ChartNode;
});