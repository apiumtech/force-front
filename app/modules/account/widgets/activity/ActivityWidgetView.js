/**
 * Created by justin on 3/13/15.
 */
define([
    'shared/BaseView',
    'shared/services/bus/AccountDetailWidgetEventBus',
    'modules/account/widgets/activity/ActivityWidgetModel',
    'modules/account/widgets/activity/ActivityWidgetPresenter',
    'shared/services/DateTimeDecoratorService',
    'underscore'
], function (BaseView, AccountDetailWidgetEventBus, ActivityWidgetModel, ActivityWidgetPresenter, DateTimeDecoratorService, _) {

    function ActivityWidgetView($scope, $element, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$element = $element;
        this.currentPage = -1;
        this.isLastPage = false;
        this.nextPage = false;
        this.dateTimeDecoratorService = DateTimeDecoratorService.newInstance();
    }

    ActivityWidgetView.inherits(BaseView, {
        accountId: {
            get: function () {
                return this.$scope.accountId;
            },
            set: function (value) {
                this.$scope.accountId = value;
            }
        },
        activitiesList: {
            get: function () {
                return this.$scope.activitiesList || (this.$scope.activitiesList = []);
            },
            set: function (value) {
                this.$scope.activitiesList = value;
            }
        },
        eventChannel: {
            get: function () {
                return this.$scope.eventChannel || ( this.$scope.eventChannel = AccountDetailWidgetEventBus.newInstance());
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        }
    });

    ActivityWidgetView.prototype._show = BaseView.prototype.show;
    ActivityWidgetView.prototype.show = function () {
        this._show();
        this.configureEvents();
    };

    ActivityWidgetView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

        self.eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        self.fn.requestNextPage = function () {
            if (self.isLastPage) return;

            self.nextPage = true;
            self.eventChannel.sendReloadCommand();
        };

        self.fn.toggleFollow = function (activityId) {
            self.event.onActivityFollowToggled(activityId);
        };

        scope.$watch('accountId', self.onAccountIdChanged.bind(self));
        scope.$on("$destroy", self.onDisposing.bind(self));
    };

    ActivityWidgetView.prototype.onAccountIdChanged = function () {
        var self = this;
        if (self.accountId) {
            self.nextPage = true;
            self.eventChannel.sendReloadCommand();
        }
    };

    ActivityWidgetView.prototype.loadActivityData = function () {
        var self = this;

        if (self.nextPage) {
            self.currentPage = self.currentPage + 1;
            self.nextPage = false;
        }

        self.event.onLoadActivity(self.accountId, self.currentPage);
    };

    ActivityWidgetView.prototype.onReloadCommandReceived = function (isReload) {
        var self = this;

        if (isReload) {
            self.activitiesList = [];
            self.currentPage = 0;
            self.isLastPage = false;
        }

        self.loadActivityData();
    };

    ActivityWidgetView.prototype.onActivityLoaded = function (data) {
        var self = this;
        self.eventChannel.sendReloadCompleteCommand();
        self.decorateActivityData(data);
        if (!data.length) {
            self.isLastPage = true;
        }
    };

    ActivityWidgetView.prototype.decorateActivityData = function (data) {
        var self = this;
        var decorated = _.sortBy(data, function (record) {
            return record.date;
        }).reverse().map(function (record) {
            record.timeLabel = self.dateTimeDecoratorService.getFormattedDateDistance(record.date, new Date());
            return record;
        });

        var grouped = _.groupBy(decorated, function (record) {
            return record.timeLabel;
        });

        var flatten = self.activitiesList;
        _.each(grouped, function (groupRecords, groupName) {
            flatten.push({timeLabel: groupName, isDelimiter: true});

            _.each(groupRecords, function (activityRecord) {
                flatten.push(activityRecord);
            });
        });
    };

    ActivityWidgetView.prototype.followToggled = function (follow) {
        var self = this;
        var toggled = _.find(self.activitiesList, function (record) {
            return record.id === follow.id;
        });

        toggled.isFollowed = follow.isFollowed;
    };

    ActivityWidgetView.prototype.onDisposing = function () {
        var self = this;
        self.eventChannel.unsubscribeReloadCommand();
        self.eventChannel.unsubscribeReloadCompleteCommand();
        self.eventChannel = null;
    };

    ActivityWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $model = $model || ActivityWidgetModel.newInstance();
        $presenter = $presenter || ActivityWidgetPresenter.newInstance();
        var view = new ActivityWidgetView($scope, $element, $model, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return ActivityWidgetView;
});