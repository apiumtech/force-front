/**
 * Created by justin on 12/18/14.
 */
app.registerDirective(function(container){

    function PageHeaderDirective() {
        return {
            restrict: 'EA',
            scope: {
                title: "@"
            },
            templateUrl: '/templates/directives/pageHeader.html'

        }
    }

    return PageHeaderDirective;
});