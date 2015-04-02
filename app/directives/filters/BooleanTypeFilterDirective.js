/**
 * Created by justin on 4/2/15.
 */
app.registerDirective(function (container) {
    var StringTypeFilterController = container.getController("controllers/filters/StringTypeFilterController");
    var BaseFilterDirective = container.getService("directives/filters/BaseFilterDirective");

    function BooleanTypeFilterDirective() {
        BaseFilterDirective.call(this);

        this.controller = StringTypeFilterController;
        this.templateUrl = '/templates/filters/booleanTypeFilter.html';

        return this;
    }

    BooleanTypeFilterDirective.prototype = Object.create(BaseFilterDirective.prototype);

    return BooleanTypeFilterDirective;
});