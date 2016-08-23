angular.module('thinkingVisually.charts.project.model', [
  'thinkingVisually.charts.chart.model',
  'thinkingVisually.charts.chartType.model'
])

.factory('Project', function (Chart) {
 
  /**
   * Constructor, with class name
   */
  function Project(studentName, teacherName, chart, currentStep, completedStep, maxStep, url) {
    // Public properties, assigned to the instance ('this')
    this.studentName = studentName;
    this.teacherName = teacherName;
    this.chart = chart;
    this.currentStep = currentStep;
    this.completedStep = completedStep;
    this.maxStep = maxStep;
    this.url = url;
  }
 
  /**
   * Public method, assigned to prototype
   */
  
  Project.prototype.setChart = function (chart) {
    this.chart = Chart.build(chart);
  };

  Project.prototype.getChartId = function () {
    return (this.chart!=null && this.chart.chartType!=null)? this.chart.chartType.id : null;
  };

  Project.prototype.getChartType = function () {
    return (this.chart!=null && this.chart.chartType!=null)? this.chart.chartType.type : null;
  };

  Project.prototype.getChartRows = function () {
    return (this.chart!=null)? this.chart.rows : null;
  };

  Project.prototype.getChartBoxes = function () {
    return (this.chart!=null)? this.chart.boxesNum : null;
  };

  Project.prototype.getChartName = function () {
    return (this.chart!=null && this.chart.chartType!=null)? this.chart.chartType.name : null;
  };
 
  /**
   * Static method, assigned to class
   * Instance ('this') is not available in static context
   */
  Project.build = function (data) {    
    return new Project( 
      data.studentName,
      data.teacherName,
      Chart.build(data.chart),
      data.currentStep,
      data.completedStep,
      data.maxStep,
      data.url
    );
  };
 
  /**
   * Return the constructor function
   */
  return Project;
});