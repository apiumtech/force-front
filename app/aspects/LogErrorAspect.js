/**
 * Created by kevin on 10/27/14.
 */
app.registerService(function (container) {
    var meld = container.getFunction('meld');

    return {
        _log: console.log,
        weave: function (view) {
            meld.before(view, "showError", function (error) {
                this._log(error.stack);
            }.bind(this));
        }
    };
});