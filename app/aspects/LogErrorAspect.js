/**
 * Created by kevin on 10/27/14.
 */
app.registerService(function (container) {
    var meld = container.getFunction('meld');

    return {
        weave: function (view) {
            meld.before(view, "showError", function (error) {
                console.log(error.stack);
            });
        }
    };
});