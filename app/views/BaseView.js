/**
 * Created by justin on 12/18/14.
 */
app.registerView(function (container) {

    var ViewRepaintAspect = container.getService('aspects/ViewRepaintAspect');
    var LogErrorAspect = container.getService('aspects/LogErrorAspect');

    function BaseView($scope, $model, $presenter) {
        this.$scope = $scope || {
            $on: function () {
            },
            $watch: function () {
            }
        };
        this.event = {};
        this.fn = {};
        this.data = {};

        this.model = $model;
        this.presenter = $presenter;
    }

    BaseView.prototype = Object.create(Object.prototype, {
        $scope: {
            get: function () {
                return this._scope;
            },
            set: function (value) {
                this._scope = value;
            }
        },
        data: {
            get: function () {
                return this._scope.data;
            },
            set: function (value) {
                this._scope.data = value;
            }
        },
        event: {
            get: function () {
                return this._scope.event;
            },
            set: function (value) {
                this._scope.event = value;
            }
        },
        fn: {
            get: function () {
                return this._scope.fn;
            },
            set: function (value) {
                this._scope.fn = value;
            }
        }
    });

    BaseView.prototype.show = function () {
        if (this.presenter)
            this.presenter.show(this, this.model);
    };

    BaseView.prototype.showError = function (error) {
        if (this.presenter)
            this.presenter.showError(error);
    };

    BaseView.prototype._injectAspects = function ($viewRepAspect, $logErrorAspect) {
        if ($viewRepAspect !== false) {
            ($viewRepAspect || ViewRepaintAspect).weave(this);
        }

        if ($logErrorAspect !== false) {
            ($logErrorAspect || LogErrorAspect).weave(this);
        }

        return Some(this);
    };


    return BaseView;
});