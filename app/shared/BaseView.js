/**
 * Created by justin on 12/18/14.
 */
define([
    'config',
    'shared/aspects/ViewRepaintAspect',
    'shared/aspects/LogErrorAspect'
], function (Configuration, ViewRepaintAspect, LogErrorAspect) {

    function BaseView($scope, $model, $presenter) {
        this._scope = {};
        $scope = $scope || {
                $on: function () {
                },
                $watch: function () {
                }
            };

        this.$scope = $scope;
        this.event = {};
        this.fn = {};
        this.data = {};

        this.model = $model;
        this.presenter = $presenter;
        this.$scope.config = Configuration;
    }

    BaseView.inherits(Object, {
        $scope: {
            get: function () {
                return this._scope;
            },
            set: function (value) {
                var self = this;
                Object.keys(self._scope).forEach(function (obj) {
                    if (self._scope[obj])
                        value[obj] = self._scope[obj];
                });

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
        },
        config: {
            get: function () {
                return this._scope.config;
            },
            set: function (value) {
                this._scope.config = value;
            }
        }
    });

    BaseView.prototype.show = function () {
        if (this.presenter && this.presenter.show)
            this.presenter.show(this, this.model);
    };

    BaseView.prototype.showError = function (error) {
        if (this.presenter && this.presenter.showError)
            this.presenter.showError(error);
    };

    // TODO: Deprecated
    BaseView.prototype._injectAspects = function ($viewRepAspect, $logErrorAspect) {
        if ($viewRepAspect !== false) {
            ($viewRepAspect || ViewRepaintAspect).weave(this);
        }

        if ($logErrorAspect !== false) {
            ($logErrorAspect || LogErrorAspect).weave(this);
        }

        return this;
    };

    BaseView.prototype.generateSuccessMessage = function(message){
        return "<div class='notify success'>" +
            "<span class='ok-tick'><i class='ic-accept'></i></span>" +
            "<strong>Well done!</strong>" +
            "<p>"+message+"</p>" +
            "</div>";
    };

    BaseView.prototype.isValidKey = function(e){
        var keycode = e.keyCode;

        var valid =
            (keycode > 47 && keycode < 58)   || // number keys
            keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
            (keycode > 64 && keycode < 91)   || // letter keys
            (keycode > 95 && keycode < 112)  || // numpad keys
            (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
            (keycode > 218 && keycode < 223) || // [\]' (in order)
            (keycode == 8 || keycode == 46);    // backspace & delete

        return valid;
    };

    return BaseView;
});