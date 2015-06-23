define([
    'shared/BaseView',
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarPresenter',
    'jquery'
], function (BaseView, AgendaCalendarPresenter, $) {
    'use strict';

    function AgendaCalendarView($scope, $element, presenter) {
        presenter = presenter || new AgendaCalendarPresenter();
        BaseView.call(this, $scope, null, presenter);
        this.element = $element;
        this.configureEvents();
    }

    AgendaCalendarView.inherits(BaseView, {});

    AgendaCalendarView.prototype.configureEvents = function(){
        var self = this;
        self.initCalendar();
    };

    AgendaCalendarView.prototype.initCalendar = function(){
        var self = this;
        var calendar = self.element.find("#agenda-calendar");
    };

    AgendaCalendarView.newInstance = function ($scope, $element, model, presenter, viewRepaintAspect, logErrorAspect) {
        var view = new AgendaCalendarView($scope, $element, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return AgendaCalendarView;
});