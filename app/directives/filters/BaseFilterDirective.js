/**
 * Created by Justin on 4/2/2015.
 */
app.registerService(function () {
    function BaseFilterDirective() {
        this.restrict = "EA";
        this.scope = {
            filterFor: "=",
            onClose: "&"
        };
    }

    return BaseFilterDirective;
});