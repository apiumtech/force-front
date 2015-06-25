define([
    'shared/BaseView',
    'moment',
    'config'
], function (BaseView, moment) {
    'use strict';

    function AddCompanyDialogView($scope, $modalInstance) {
        var event = $scope.event;
        BaseView.call(this, $scope);
        $scope.event = event;
        this.$modalInstance = $modalInstance;
        this.event.start = {};
        this.event.end = {};
        this.configureEvents();
    }

    AddCompanyDialogView.inherits(BaseView, {
        event: {
            get: function () {
                return this.$scope.event;
            },
            set: function (value) {
                this.$scope.event = value;
            }
        }
    });

    AddCompanyDialogView.prototype.configureEvents = function () {
        var self = this;

        self.fn.close = function () {
            self.$modalInstance.dismiss();
        };

        self.fn.submit = function () {
            var startDate = moment.utc(self.event.start.date);
            var startTime = self.event.start.time ? moment.utc(self.event.start.time) : moment();
            startDate.hour(startTime.hour());
            startDate.minute(startTime.minute());
            self.event.start = startDate.toISOString();

            if(!self.event.end.date) self.event.end = self.event.start;
            else{
                var endDate = moment.utc(self.event.end.date);
                var endTime = self.event.end.time ? moment.utc(self.event.end.time) : moment();
                endDate.hour(endTime.hour());
                endDate.minute(endTime.minute());
                self.event.end = endDate.toISOString();
            }

            self.$modalInstance.close(self.event);
        };

    };

    AddCompanyDialogView.newInstance = function ($scope, $modalInstance, $viewRepaintAspect, $logErrorAspect) {
        var previewDialogView = new AddCompanyDialogView($scope, $modalInstance);
        return previewDialogView._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return AddCompanyDialogView;
});