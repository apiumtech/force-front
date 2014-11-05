/**
 * Created by kevin on 11/5/14.
 */
app.registerController(function (container) {
    var FilterView = container.getView("views/filters/FilterView");

    function FilterController($scope) {
        this.view = FilterView.newInstance($scope).getOrElse(throwException("Could not create FilterView!"));
        this.view.show();
    }

    return FilterController;
});
