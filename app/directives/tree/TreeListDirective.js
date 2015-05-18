/**
 * Created by apium on 5/13/15.
 */
app.registerDirective(function () {
    function TreeListDirective(RecursionHelper) {
        return {
            restrict: 'AE',
            scope: {
                treeList: '=treeList',
                cls: '=ngClass',
                groupSelectionChanged: "&",
                selectionChanged: "&"
            },
            templateUrl: 'templates/treeList/treeList.html',
            compile: function(element) {
                return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){
                    // Define your normal link function here.
                    // Alternative: instead of passing a function,
                    // you can also pass an object with
                    // a 'pre'- and 'post'-link function.
                });
            }
        };
    }

    return TreeListDirective;
});