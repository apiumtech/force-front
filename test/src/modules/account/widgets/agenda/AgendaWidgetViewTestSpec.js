/**
 * Created by justin on 3/18/15.
 */

define([
    'modules/account/widgets/agenda/AgendaWidgetView',
    'modules/account/widgets/agenda/AgendaWidgetPresenter',
    'shared/services/ModalDialogAdapter',
    'angular'
], function (AgendaWidgetView, AgendaWidgetPresenter, ModalDialogAdapter, angular) {
    'use strict';
    describe("AgendaWidgetView", function () {

        var sut, presenter, model, $scope, element, modalDialogAdapter;

        beforeEach(function () {

            inject(function($rootScope){
                $scope = $rootScope.$new();
                $scope.$modal = {
                    open: sinon.stub()
                };
            });
            modalDialogAdapter = mock(ModalDialogAdapter);
            presenter = mock(AgendaWidgetPresenter);
            element = angular.element("<div />");
            sut = new AgendaWidgetView($scope, element, presenter, modalDialogAdapter);
        });

        describe('Constructor', function () {
            beforeEach(function () {
                sinon.stub(AgendaWidgetView.prototype, "configureEvents");
            });
            afterEach(function () {
                AgendaWidgetView.prototype.configureEvents.restore();
            });
            it('should call configureEvents', function () {
                new AgendaWidgetView($scope, element, presenter, modalDialogAdapter);
                expect(AgendaWidgetView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe('configureEvents', function () {

            beforeEach(function () {
                sut.configureEvents();
            });

            describe('fn.addEvent', function () {
                var promise = {'obj': 123};
                var paramDialog = {
                    result: {
                        then: function (b) {
                            b(promise);
                        }
                    }
                };

                beforeEach(function () {
                    $scope.$modal.open.returns(paramDialog);
                    sut.event.onAddEvent = sinon.stub();
                    sut.fn.addEvent();
                });

                it("should open the dialog", function () {
                    expect($scope.$modal.open).toHaveBeenCalled();
                });

                it("should fire onAddEvent event after dialog dismissed", function () {
                    expect(sut.event.onAddEvent).toHaveBeenCalledWith({'obj': 123});
                });

            });
        });


        describe("onAccountIdChanged", function () {
            it("should call sendReloadCommand if accountId is assigned", function () {
                sut.accountId = 1;
                spyOn(sut.eventChannel, 'sendReloadCommand');
                sut.onAccountIdChanged();
                expect(sut.eventChannel.sendReloadCommand).toHaveBeenCalled();
            });

            it("should not call sendReloadCommand if accountId is undefined or null", function () {
                spyOn(sut.eventChannel, 'sendReloadCommand');
                sut.onAccountIdChanged();
                expect(sut.eventChannel.sendReloadCommand).not.toHaveBeenCalled();
            });
        });

        describe("onAgendaLoaded", function () {
            it("should send sendReloadCompleteCommand to event", function () {
                spyOn(sut.eventChannel, 'sendReloadCompleteCommand');
                sut.onAgendaLoaded([]);
                expect(sut.eventChannel.sendReloadCompleteCommand).toHaveBeenCalledWith();
            });
        });

        describe("loadAgendaData", function () {
            beforeEach(function () {
                sut.event.onLoadAgenda = jasmine.createSpy();

                sut.nextPage = false;
            });

            it("should fire event onLoadActivity", function () {
                sut.accountId = 1;
                sut.loadAgendaData();
                expect(sut.event.onLoadAgenda).toHaveBeenCalledWith(sut.accountId);
            });
        });

        describe("onReloadCommandReceived", function () {
            it("should call loadAgendaData method", function () {
                spyOn(sut, 'loadAgendaData');
                sut.onReloadCommandReceived();
                expect(sut.loadAgendaData).toHaveBeenCalledWith();
            });
        });

        describe('onEventAdded', function () {
            var event = {
                title: "e1",
                start: "12-12-2015"
            };

            beforeEach(function () {
                sut.eventChannel = {
                    sendReloadCommand: sinon.stub()
                };
                sut.onEventAdded(event);
            });

            it('should send a reload command', function () {
                expect(sut.eventChannel.sendReloadCommand).toHaveBeenCalled();
            });

            it("should show a notification dialog", function () {
                expect(sut.modalDialogAdapter.notify).toHaveBeenCalled();
            });
        });

    });

});