/**
 * Created by apium on 5/13/15.
 */
app.registerDirective(function () {
    function TreeListDirective($compile) {
        return {
            restrict: 'AE',
            scope: {
                treeList: '=treeList',
                cls: '=ngClass',
                groupSelectionChanged: "&",
                selectionChanged: "&"
            },
            replace: true,
            templateUrl: 'templates/treeList/treeList.html',
            link: function(scope, element, attrs) {
                element.addClass(attrs.class);
                element.addClass(scope.cls);


                var contents = element.contents();

                $compile(contents)(scope);
            }
        };
    }

    return TreeListDirective;
});