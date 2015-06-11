define([
    'app',
    'shared/services/notification/NotificationService'
], function (app, NotificationService) {
    'use strict';

    describe('NotificationService Test', function () {
        var sut;
        beforeEach(function () {
            sut = new NotificationService();
        });

        describe("registering to dependency injection", function () {
            it('should be singleton', function () {
                var instance1 = app.di.resolve('notificationService');
                instance1.__some_fake_value = "this is value to identify the single ton";
                var instance2 = app.di.resolve('notificationService');
                expect(instance2.__some_fake_value).not.toBeUndefined();
                expect(instance2.__some_fake_value).toEqual('this is value to identify the single ton');
            });
        });

        describe("pushMessage", function () {
            beforeEach(function () {
                sut.notifications = [{
                    channel: 'channel1',
                    message: {},
                    type: 'info'
                }, {
                    channel: 'channel2',
                    message: {some_fake_obj: 'value'},
                    type: 'info'
                }];
            });
            it("should push the message to notifications list", function () {
                sut.pushMessage('channel3', {fakeObject2: "value_here"});
                expect(sut.notifications.length).toEqual(3);
                expect(sut.notifications[2]).toEqual({
                    channel: 'channel3',
                    message: {fakeObject2: "value_here"},
                    type: 'info'
                });
            });
            it("should push the message with correct type to notifications list", function () {
                sut.pushMessage('channel3', {fakeObject2: "value_here"}, 'error');
                expect(sut.notifications.length).toEqual(3);
                expect(sut.notifications[2]).toEqual({
                    channel: 'channel3',
                    message: {fakeObject2: "value_here"},
                    type: 'error'
                });
            });

            describe("missing channel param", function () {
                it('should throw error', function () {
                    expect(function () {
                        sut.pushMessage(null, {});
                    }).toThrow(new Error("Channel must be specified"));
                });
            });

            describe("missing message param", function () {
                it('should throw error', function () {
                    expect(function () {
                        sut.pushMessage('channel1');
                    }).toThrow(new Error("Message must be specified"));
                });
            });
        });

        describe("getMessages", function () {
            beforeEach(function () {
                sut.notifications = [{
                    channel: 'channel1',
                    message: 'value1',
                    type: 'info'
                }, {
                    channel: 'channel1',
                    message: 'value2',
                    type: 'info'
                }, {
                    channel: 'channel1',
                    message: 'value3',
                    type: 'info'
                }, {
                    channel: 'channel2',
                    message: {some_fake_obj: 'value'},
                    type: 'info'
                }, {
                    channel: 'channel2',
                    message: {some_fake_obj: 'value2'},
                    type: 'info'
                }, {
                    channel: 'channel2',
                    message: {some_fake_obj: 'value3'},
                    type: 'info'
                }];
            });

            it("should get the list of available messages in specified channel", function () {
                var actual = sut.getMessages('channel2');
                expect(actual).toEqual([{
                    channel: 'channel2',
                    message: {some_fake_obj: 'value'},
                    type: 'info'
                }, {
                    channel: 'channel2',
                    message: {some_fake_obj: 'value2'},
                    type: 'info'
                }, {
                    channel: 'channel2',
                    message: {some_fake_obj: 'value3'},
                    type: 'info'
                }]);
            });

            it("should remove the messages in the specified channel from notifications list", function () {
                sut.getMessages('channel1');
                expect(sut.notifications).toEqual([{
                    channel: 'channel2',
                    message: {some_fake_obj: 'value'},
                    type: 'info'
                }, {
                    channel: 'channel2',
                    message: {some_fake_obj: 'value2'},
                    type: 'info'
                }, {
                    channel: 'channel2',
                    message: {some_fake_obj: 'value3'},
                    type: 'info'
                }]);
            });

            describe("no channel specified to get messages", function () {
                it("should throw error", function () {
                    expect(function(){
                        sut.getMessages();
                    }).toThrow(new Error('Channel must be specified'));
                });
            });
        });
    });
});