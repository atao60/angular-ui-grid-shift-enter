var app = angular.module('popDemo',[
    'angular-meteor', 
    'ui.bootstrap', 
    'ui.router',
    'ui.grid', 
    'ui.grid.edit', 
    'ui.grid.selection', 
    'ui.grid.treeView', 
    'ui.grid.autoResize', 
    'ui.grid.saveState', 
    'ui.grid.resizeColumns', 
    'ui.grid.cellNav', 
    'ui.grid.moveColumns', 
    'ui.grid.pinning', 
    'ui.grid.grouping', 
    'ui.grid.expandable'
]);

app.controller('mainCtrl', ['$scope',
function ($scope) {
      
    $scope.modeEcran = {visible : "visible"};
    $scope.mode = 'edit';
      
}]);
