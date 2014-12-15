/**
 * Created by kevin on 10/30/14.
 */
app.registerService(function (container) {
    function ObjectMerger() {

    }

    ObjectMerger.prototype.leftMerge = function (a, b, deep) {
        deep = deep || true;
        var result = {};

        var allKeys = Object.keys(a).concat(Object.keys(b)).filter(function (x) {
            return a.hasOwnProperty(x) || b.hasOwnProperty(x);
        });

        allKeys.forEach(function (key) {
            if (typeof b[key] === "object") {
                if (deep) {
                    result[key] = this.leftMerge(a[key], b[key]);
                } else {
                    result[key] = a[key] || b[key];
                }
            } else {
                result[key] = a[key] || b[key];
            }
        }.bind(this));

        return result;
    };

    ObjectMerger.prototype.rightMerge = function (a, b) {
        return this.leftMerge(b, a);
    };

    var instance = new ObjectMerger();
    return {
        getInstance: function () {
            return instance;
        }
    };
});