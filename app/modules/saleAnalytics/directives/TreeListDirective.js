/**
 * Created by apium on 5/13/15.
 */

define([
    'app',
    'underscore',
    'modules/saleAnalytics/eventBus/UserTreeListEventBus'
], function (app, _, UserTreeListEventBusClass) {
    'use strict';

    var UserTreeListEventBus = UserTreeListEventBusClass.getInstance();

    function TreeListDirective(RecursionHelper) {
        return {
            restrict: 'AE',
            scope: {
                treeList: '=treeList',
                groupSelectionChanged: "&",
                selectionChanged: "&",
                multipleSelection: "="
            },
            templateUrl: 'app/modules/saleAnalytics/directives/treeList.html',
            compile: function (element) {
                return RecursionHelper.compile(element, function (scope, iElement, iAttrs, controller, transcludeFn) {

                    scope.toggleSelectGroupItems = function (parentItem, event, notFireEvent) {
                        event.stopPropagation();

                        var selectState = parentItem.checked;
                        parentItem.isOpen = true;
                        parentItem.checked = !selectState;
                        parentItem.children.forEach(function (n) {
                            if (n.children) {
                                n.checked = selectState;
                                scope.toggleSelectGroupItems(n, event, !notFireEvent);
                            } else {
                                n.checked = !selectState;
                            }
                        });

                        if (!notFireEvent){
                            UserTreeListEventBus.fireNodeSelected();
                        }
                    };

                    scope.toggleNode = function (item) {
                        item.checked = !item.checked;

                        /*if (item.children && scope.multipleSelection) {
                            return;
                        }*/

                        UserTreeListEventBus.fireNodeSelected(item);
                    };
                });
            }
        };
    }

    app.register.directive('treeList', ['RecursionHelper', TreeListDirective]);

    return TreeListDirective;
});