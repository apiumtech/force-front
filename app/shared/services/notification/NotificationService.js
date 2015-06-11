define([
    'app'
], function (app) {
    'use strict';

    function NotificationService() {
        this.notifications = [];
    }

    NotificationService.prototype.pushMessage = function (channel, message, type) {
        if (!channel)
            throw new Error("Channel must be specified");
        if (!message)
            throw new Error("Message must be specified");

        this.notifications.push({
            channel: channel,
            message: message,
            type: type || 'info'
        });
    };

    NotificationService.prototype.getMessages = function (channel) {
        if (!channel)
            throw new Error('Channel must be specified');

        var messages = this.notifications.filter(function (notification) {
            return notification.channel == channel;
        });

        this.notifications = this.notifications.filter(function (notification) {
            return notification.channel !== channel;
        });

        return messages;
    };

    NotificationService.getInstance = function () {
        return NotificationService.__instance || (NotificationService.__instance = new NotificationService());
    };

    app.di.register("notificationService").instance(NotificationService.getInstance());

    return NotificationService;
});