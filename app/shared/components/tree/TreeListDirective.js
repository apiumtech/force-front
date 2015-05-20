/**
 * Created by apium on 5/13/15.
 */
app.registerDirective(function (container) {
    var _ = container.getFunction("underscore");
    var eventBus = container.getService('services/UserTreeListEventBus').getInstance();

    function TreeListDirective(RecursionHelper) {
        return {
            restrict: 'AE',
            scope: {
                treeList: '=treeList',
                groupSelectionChanged: "&",
                selectionChanged: "&"
            },
            templateUrl: 'templates/treeList/treeList.html',
            compile: function (element) {
                return RecursionHelper.compile(element, function (scope, iElement, iAttrs, controller, transcludeFn) {

                    scope.toggleSelectGroupItems = function (parentItem, event, notFireEvent) {
                        event.stopPropagation();
                        var selectState = parentItem.checked;
                        parentItem.checked = !selectState;
                        parentItem.children.forEach(function (n) {
                            if (n.children) {
                                n.checked = selectState;
                                scope.toggleSelectGroupItems(n, event, !notFireEvent);
                            }
                            else n.checked = !selectState;
                        });

                        if (!notFireEvent)
                            eventBus.fireNodeSelected();
                    };

                    scope.toggleNode = function (item) {
                        item.checked = !item.checked;
                        if (item.children) return;
                        eventBus.fireNodeSelected(item);
                    };
                });
            }
        };
    }

    return TreeListDirective;
});