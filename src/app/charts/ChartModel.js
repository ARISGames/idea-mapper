angular.module('thinkingVisually.charts.chart.model', [
  'thinkingVisually.charts.chartType.model',
  'thinkingVisually.charts.chartNode.model'
])

.factory('Chart', function (ChartType, ChartNode) {
 
  /**
   * Constructor, with class name
   */
  function Chart(chartType, boxesNum, rows, splits, titleColor, bodyColor, chartNodes, backgroundImg, titleText) {
    // Public properties, assigned to the instance ('this')
    this.chartType = chartType;
    this.boxesNum = boxesNum;
    this.rows = rows;
    this.splits = splits;
    this.titleColor = titleColor;
    this.bodyColor = bodyColor;
    this.chartNodes = chartNodes == null ? createDefaultNodes() : chartNodes;
    this.backgroundImg = backgroundImg;
    this.titleText = titleText;
  }

  /**
   * Public method, assigned to prototype
   */

  /**
   * Private function
   */
  function createDefaultNodes() {
    var nodes = [];
    for (var i = 0; i < 10; i++) {
      nodes[i] = new ChartNode('', '', null);
    }
    return nodes;
  }   
 
  /**
   * Static method, assigned to class
   * Instance ('this') is not available in static context
   */
  Chart.build = function (data) {
    if (data == null) {
      return null;
    }

    return new Chart(
      ChartType.build(data.chartType),
      data.boxesNum,
      data.rows,
      data.splits,
      data.titleColor,
      data.bodyColor,
      data.chartNodes,
      data.backgroundImg,
      data.help,
      data.menuSelectionHelp,
      data.addTextHelp
    );
  };
 
  /**
   * Return the constructor function
   */
  return Chart;
});