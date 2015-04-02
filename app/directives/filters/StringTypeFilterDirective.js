/**
 * Created by justin on 4/2/15.
 */
app.registerDirective(function (container) {
    var StringTypeFilterController = container.getController("controllers/filters/StringTypeFilterController");
    var BaseFilterDirective = container.getService("directives/filters/BaseFilterDirective");

    function StringTypeFilterDirective() {
        BaseFilterDirective.call(this);

        this.controller = StringTypeFilterController;
        this.templateUrl = '/templates/filters/stringTypeFilter.html';

        return this;
    }

    StringTypeFilterDirective.prototype = Object.create(BaseFilterDirective.prototype);

    return StringTypeFilterDirective;
});