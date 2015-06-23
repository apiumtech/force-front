define([
    'shared/services/ajax/FakeAjaxService',
], function (AjaxService) {
    'use strict';

    function AgendaCalendarModel(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
    }

    AgendaCalendarModel.prototype.loadEvents = function(){
        return this.ajaxService.rawAjaxRequest({
            result: {
                events: [
                    {
                        id: 1,
                        title  : 'Yoga',
                        start  : '2015-06-23T10:30:00',
                        end    : '2015-06-23T11:30:00',
                        type   : 'event'
                    },
                    {
                        id: 2,
                        title  : 'Meeting',
                        start  : '2015-06-28T13:30:00',
                        end    : '2015-06-28T15:30:00',
                        type   : 'task'
                    },
                    {
                        id: 3,
                        title  : 'Planning',
                        start  : '2015-06-23T16:30:00',
                        end    : '2015-06-23T18:00:00',
                        type   : 'event'
                    },
                    {
                        id: 4,
                        title  : 'Dinner',
                        start  : '2015-06-12T18:30:00',
                        end    : '2015-06-13T19:30:00',
                        type   : 'other'
                    },
                    {
                        id: 5,
                        title  : 'Movie',
                        start  : '2015-06-24T10:30:00',
                        end    : '2015-06-24T11:30:00',
                        type   : 'task'
                    },
                    {
                        id: 6,
                        title  : 'Lunch',
                        start  : '2015-06-25T13:30:00',
                        end    : '2015-06-25T15:30:00',
                        type   : 'event'
                    },
                    {
                        id: 7,
                        title  : 'Jogging',
                        start  : '2015-06-26T16:30:00',
                        end    : '2015-06-27T18:00:00',
                        type   : 'task'
                    },
                    {
                        id: 8,
                        title  : 'School',
                        start  : '2015-06-22T18:30:00',
                        end    : '2015-06-22T19:30:00',
                        type   : 'other'
                    }

                ]
            }
        });
    };

    return AgendaCalendarModel;
});
