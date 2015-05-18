/**
 * Created by apium on 5/13/15.
 */
app.registerView(function (container) {
    var $ = container.getFunction('jquery');

    function TreeNodeView(scope, element, attrs, $compile) {

        //if (!scope.item.children) {
        //    var menu = $('<div class="pull-left m-t-5">{{item.name}}</div>');
        //    element.append(menu);
        //} else {
        //    var $submenu = $('<accordion class="users-filter-list team-view clearfix" close-others="false"><div tree-list="item.children"></div></accordion>');
        //    element.append($submenu);
        //}
        //
        var contents = element.contents();
        console.log(element.html());
        console.log(contents);
        $compile(contents)(scope);
    }


    return TreeNodeView;
});