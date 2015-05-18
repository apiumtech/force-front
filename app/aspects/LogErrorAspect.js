/**
 * Created by kevin on 10/27/14.
 * Modified by joanllenas 5/5/15.
 */
app.registerService(function (container) {
    var meld = container.getFunction('meld');

    function errorMessage(error, defaultMessage){
        return isset(error) ? error.stack || error.toString() : defaultMessage;
    }

    return {
        weave: function (view) {
            meld.before(view, "showError", function (error) {
                console.log(errorMessage(error, "Error without value"));
            }.bind(this));

            meld.afterThrowing(view, /^[a-z].+/, function (error) {
                console.warn(errorMessage(error, "Error without value"));
            }.bind(this));
        }
    };
});