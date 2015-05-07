/**
 * Created by kevin on 10/27/14.
 * Modified by joanllenas 5/5/15.
 */
app.registerService(function (container) {
    var meld = container.getFunction('meld');

    function errorMessage(error){
        return error.stack || error.toString();
    }

    return {
        _log: console.log,
        _error: console.error,
        weave: function (view) {
            meld.before(view, "showError", function (error) {
                this._log(errorMessage(error));
            }.bind(this));

            meld.afterThrowing(view, /^[a-z].+/, function (error) {
                this._error(errorMessage(error));
            }.bind(this));
        }
    };
});