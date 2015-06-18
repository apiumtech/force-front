/**
 * Created by justin on 3/13/15.
 */
define([
    'modules/widgets/WidgetWrapperView'
], function (WidgetWrapperView) {
    'use strict';
    describe("WidgetWrapperView", function () {

        var sut, scope, element;

        beforeEach(function () {
            scope = {
                foreverScroll: function () {
                },
                $watch: function () {
                },
                $on: function () {
                }
            };
            element = {};
            sut = WidgetWrapperView.newInstance(scope, element, false, false);
        });

        describe("handleScroll", function () {
            [{
                divHeight: 300,
                scrollTop: 40,
                contentHeight: 700,
                toCall: false
            }, {
                divHeight: 300,
                scrollTop: 350,
                contentHeight: 700,
                toCall: false
            }, {
                divHeight: 300,
                scrollTop: 400,
                contentHeight: 700,
                toCall: true
            }].forEach(function (testCase) {

                    it("should fire event foreverScroll if the content is scroll to bottom", function () {
                        var event = {
                            target: {
                                offsetHeight: testCase.divHeight,
                                scrollTop: testCase.scrollTop,
                                scrollHeight: testCase.contentHeight
                            }
                        };

                        spyOn(scope, 'foreverScroll');
                        sut.handleScroll(event);
                        if (testCase.toCall)
                            expect(scope.foreverScroll).toHaveBeenCalled();
                        else
                            expect(scope.foreverScroll).not.toHaveBeenCalled();
                    });
                });
        });

        describe("reloadPanel", function () {
            it("should call sendReloadCommand on the channel", function () {
                sut.eventBusChannel = {
                    sendReloadCommand: function () {
                    }
                };
                spyOn(sut.eventBusChannel, 'sendReloadCommand');
                sut.reloadPanel();
                expect(sut.eventBusChannel.sendReloadCommand).toHaveBeenCalledWith(true);
            });
        });

        describe("onReloadCommandReceived", function () {
            it("should turn on loading icon", function () {
                sut.isLoading = false;
                sut.onReloadCommandReceived();
                expect(sut.isLoading).toBeTruthy();
            });
        });

        describe("onReloadCompleteCommandReceived", function () {
            it("should hide loading icon", function () {
                sut.isLoading = true;
                sut.onReloadCompleteCommandReceived();
                expect(sut.isLoading).toBeFalsy();
            });
        });

        describe("bindEventsToChannel", function () {
            beforeEach(function () {
                sut.eventBusChannel = {
                    onReloadCommandReceived: function () {
                    },
                    onReloadCompleteCommandReceived: function () {
                    },
                    sendReloadCommand: function(){}
                };
                sut.boundChannelEvent = false;
            });

            it("should bind onReloadCommandReceived with correct method", function () {
                spyOn(sut.eventBusChannel, 'onReloadCommandReceived');
                sut.bindEventsToChannel();
                expect(sut.eventBusChannel.onReloadCommandReceived).toHaveBeenCalled();
            });

            it("should bind onReloadCompleteCommandReceived with correct method", function () {
                spyOn(sut.eventBusChannel, 'onReloadCompleteCommandReceived');
                sut.bindEventsToChannel();
                expect(sut.eventBusChannel.onReloadCompleteCommandReceived).toHaveBeenCalled();
            });
        });

        describe("fn.toggleCollapsePanel", function () {
            var fakeElement = {
                slideToggle: function () {
                }
            };

            beforeEach(function () {
                element.find = function () {
                    return fakeElement;
                }
            });

            it("should find the body from element", function () {
                spyOn(element, 'find').and.returnValue(fakeElement);
                sut.fn.toggleCollapsePanel();
                expect(element.find).toHaveBeenCalledWith('.panel-body');
            });

            it("should slide the body element", function () {
                spyOn(fakeElement, 'slideToggle');
                sut.fn.toggleCollapsePanel();
                expect(fakeElement.slideToggle).toHaveBeenCalled();
            });
        });

        describe("fn.expandPanel", function () {
            it("should reverse the expand state", function () {
                sut.isExpanded = true;
                sut.fn.expandPanel();
                expect(sut.isExpanded).toBeFalsy();
            });
            it("should reverse the expand state", function () {
                sut.isExpanded = false;
                sut.fn.expandPanel();
                expect(sut.isExpanded).toBeTruthy();
            });
        });

        describe("fn.reloadPanel", function () {
            it("should call reloadPanel", function () {
                spyOn(sut, 'reloadPanel');
                sut.fn.reloadPanel();
                expect(sut.reloadPanel).toHaveBeenCalled();
            });
        });

        describe("fn.closeWidget", function () {
            beforeEach(function () {
                sut.widgetId = 123;
                element.remove = jasmine.createSpy();
                sut.eventBusChannel = {
                    sendRemoveWidget: function(){}
                };
                spyOn(sut.eventBusChannel, 'sendRemoveWidget');
                sut.fn.closeWidget();
            });
            it("should remove element from dom", function () {
                expect(sut.element.remove).toHaveBeenCalled();
            });
            it("should fire a widget removed signal", function () {
//                expect(sut.eventBusChannel.sendRemoveWidget).toHaveBeenCalledWith(123);
            });
        });
    });

});
