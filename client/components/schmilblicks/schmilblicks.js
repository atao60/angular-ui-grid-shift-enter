angular.module('popDemo')

// Pre-treatment of core directive 'uiGridEditor' to intercept the Shift + Enter.
// This is set off only if the directive "shiftEnter" is present.
.directive('uiGridEditor', ['$compile', 'uiGridConstants', 'uiGridEditConstants',
function ($compile, uiGridConstants, uiGridEditConstants) {
    return {
        restrict: "A",
        scope: true, // required to access a scope shared by all the multiple uiGridEditor directives
        require: ['?^uiGrid', '?^uiGridRenderContainer', 'ngModel'],
        compile: function (element, attrs) {
            return linker;
            
            // Code duplicated from core directive 'uiGridEditor'
            function linker ($scope, element, attrs, controllers) {
                console.log('uiGridEditor, bis, compile, link');
                var withShiftEnter = 'shiftEnter' in attrs;

                var uiGridCtrl, renderContainerCtrl, ngModel;
                if (controllers[0]) { uiGridCtrl = controllers[0]; }
                if (controllers[1]) { renderContainerCtrl = controllers[1]; }
                if (controllers[2]) { ngModel = controllers[2]; }
                
                element.on('keydown', function (evt) {
                  switch (evt.keyCode) {
                  case uiGridConstants.keymap.ESC:
                      evt.stopPropagation();
                      $scope.$emit(uiGridEditConstants.events.CANCEL_CELL_EDIT);
                      break;
                  }

                  if ($scope.deepEdit &&
                    (evt.keyCode === uiGridConstants.keymap.LEFT ||
                     evt.keyCode === uiGridConstants.keymap.RIGHT ||
                     evt.keyCode === uiGridConstants.keymap.UP ||
                     evt.keyCode === uiGridConstants.keymap.DOWN)) {
                    evt.stopPropagation();
                  }
                  // Pass the keydown event off to the cellNav service, if it exists
                  else if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
                    evt.uiGridTargetRenderContainerId = renderContainerCtrl.containerId;
                    if (uiGridCtrl.cellNav.handleKeyDown(evt) !== null) {
                      $scope.stopEdit(evt);
                    }
                  }
                  else if (withShiftEnter && evt.keyCode == uiGridConstants.keymap.ENTER && evt.shiftKey) {
                    // do nothing but:
                    justToThrowAnError.isNotDefined(); // quite dirty trick but it does the job
                    // TODO any clean way to do it?
                  }
                  else {
                    //handle enter and tab for editing not using cellNav
                    switch (evt.keyCode) {
                      case uiGridConstants.keymap.ENTER: // Enter (Leave Field)
                      case uiGridConstants.keymap.TAB:
                        evt.stopPropagation();
                        evt.preventDefault();
                        $scope.stopEdit(evt);
                        break;
                    }
                  }
                  return true;       
                });
            }
        }
    };
}])

// a simple marker to trigger the above directive 'uiGridEditor'
.directive('shiftEnter', ['uiGridConstants', 'uiGridEditConstants',
function (uiGridConstants, uiGridEditConstants) {
    return {
        restrict: "A",
        scope: true,
        require: 'ngModel'
    };
    
}])

.controller('SchmilblicksCtrl', ['$scope',
function ($scope) {

   var cellTemplate = (fieldName) => {
       return `<div class="grid-tooltip" 
		                    tooltip="{{ row.entity.${fieldName} }}" 
		                    tooltip-placement="top" 
		                    tooltip-append-to-body="true">
		                    <div class="ui-grid-cell-contents wrap" 
		                        style="white-space: pre-wrap;"
		                        title="TOOLTIP">{{ COL_FIELD CUSTOM_FILTERS }}</div></div>`;
    };


    // use form with name "inputForm" to avoid losing focus with non valid input
    var editableCellTemplate = `
              <div>
                  <form name="inputForm">
                      <textarea 
                             style="position: absolute;"
                             rows="10"
                             cols="80"
                             ng-class="'colt' + col.uid" 
                             ui-grid-editor
                             shift-enter
                             ng-model="MODEL_COL_FIELD" ></textarea></form></div>`;

    $scope.titre = "Table des schmilblicks";
                    
    $scope.gridOptions = {
        data: $scope.$meteorCollection(Schmilblicks),
        enableCellEdit: false,
        rowHeight: 90,
        columnDefs: [
            { field: 'nom', 
              displayName: 'Nom'},
            { field: 'description', 
              displayName: 'Description',
              enableCellEdit: true,
		      cellTemplate: cellTemplate('description'),
              editableCellTemplate: editableCellTemplate}
        ]
    };

}]);


