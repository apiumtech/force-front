/**
 * Created by apium on 5/13/15.
 */
app.registerDirective(function (container) {
    var TreeNodeViewLinker = container.getView("views/tree/TreeNodeView");

    function TreeNodeDirective($compile) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                item: '=treeNode',
                selectionChanged: "&"
            },
            templateUrl: 'templates/treeList/treeItem.html',
            link: function (scope, element, attrs) {
                TreeNodeViewLinker(scope, element, attrs, $compile);
            }
        };
    }

    return TreeNodeDirective;
});