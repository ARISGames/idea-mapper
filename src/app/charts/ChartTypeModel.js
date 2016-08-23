angular.module('thinkingVisually.charts.chartType.model', [

])

.factory('ChartType', function () {
 
  /**
   * Constructor, with class name
   */
  function ChartType(id, type, name, defaultBoxesNum, defaultRows, defaultSplits, defaultTitleColor, defaultBodyColor, icon, labels, textComponents, help, menuSelectionHelp, addTextHelp) {
    // Public properties, assigned to the instance ('this')
    this.id = id;
    this.type = type;
    this.name = name;
    this.defaultBoxesNum = defaultBoxesNum;
    this.defaultRows = defaultRows;
    this.defaultSplits = defaultSplits;
    this.defaultTitleColor = defaultTitleColor;
    this.defaultBodyColor = defaultBodyColor;
    this.icon = icon;
    this.labels = labels;
    this.textComponents = textComponents;
    this.help = help;
    this.menuSelectionHelp = menuSelectionHelp;
    this.addTextHelp = addTextHelp;
  }
 
  /**
   * Public method, assigned to prototype
   */  
 
  /**
   * Static method, assigned to class
   * Instance ('this') is not available in static context
   */
  ChartType.build = function (data) {
    if (data == null) {
      return null;
    }
        
    return new ChartType(
      data.id,
      data.type,
      data.name,
      data.defaultBoxesNum,
      data.defaultRows,
      data.defaultSplits,
      data.defaultTitleColor,
      data.defaultBodyColor,
      data.icon,
      data.labels,
      data.textComponents,
      data.help,
      data.menuSelectionHelp,
      data.addTextHelp
    );
  };
 
  /**
   * Return the constructor function
   */
  return ChartType;
});