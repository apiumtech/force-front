define([
    'modules/literal/LiteralView'
], function (LiteralView) {
    'use strict';

    describe('LiteralView', function () {

        function exerciseCreateView(scope) {
            scope = scope || {};
            return LiteralView.newInstance({scope:scope, window:document.window, viewRepAspect:false, logErrorAspect:false});
        }

        it('should configureEvents on instantiation', function () {
            var view = exerciseCreateView();
            expect(view.fn.onInit).toBeDefined();
        });

        it('should call get LiteralType List and DeviceType List _onInit', function () {
            var view = exerciseCreateView();
            spyOn(view.event, "getLiteralTypeList");
            spyOn(view.event, "getDeviceTypeList");
            view._onInit();
            expect(view.event.getLiteralTypeList).toHaveBeenCalled();
            expect(view.event.getDeviceTypeList).toHaveBeenCalled();
        });

        it('should set literalTypeList on get LiteralType List', function () {
            var view = exerciseCreateView();
            var data = "some data";
            view.onGetLiteralTypeList(data);
            expect(view.data.literalTypeList).toBe(data);
        });

        it('should set deviceTypeList on get DeviceType List', function () {
            var view = exerciseCreateView();
            var data = "some data";
            view.onGetDeviceTypeList(data);
            expect(view.data.deviceTypeList).toBe(data);
        });

        it('should getLiteralById when deviceTypeList and literalTypeList are set', function () {
            var view = exerciseCreateView();
            var literalId = 2;
            view.routeParams = {literalId: literalId};
            spyOn(view.event, "getLiteralById");

            view.getLiteralById();
            expect(view.event.getLiteralById).not.toHaveBeenCalled();

            view.data.deviceTypeList = [];
            view.getLiteralById();
            expect(view.event.getLiteralById).not.toHaveBeenCalled();

            view.data.literalTypeList = [];
            view.getLiteralById();
            expect(view.event.getLiteralById).toHaveBeenCalledWith(literalId);
        });

        it('should goBack on cancel', function () {
            var view = exerciseCreateView();
            spyOn(view, "_goBack");
            view._onCancel();
            expect(view._goBack).toHaveBeenCalled();
        });

        it('should history back on _goBack', function () {
            var view = exerciseCreateView();
            spyOn(view.$window.history, "back");
            view._goBack();
            expect(view.$window.history.back).toHaveBeenCalled();
        });

        it('should call event.isNew with literal on isNew', function () {
            var view = exerciseCreateView();
            view.configureEvents();
            view.data.literal = "the literal";
            spyOn(view.event, "isNew");
            view.isNew();
            expect(view.event.isNew).toHaveBeenCalledWith("the literal");
        });

        it('should set literal on showForm', function () {
            var view = exerciseCreateView();
            view.showForm("the literal");
            expect(view.data.literal).toBe("the literal");
        });

        it('should set currentError on showError', function () {
            var view = exerciseCreateView();
            view.showError("the error");
            expect(view.data.currentError).toBe("the error");
        });

        describe('onSave', function () {
            var view;
            beforeEach(function () {
                view = exerciseCreateView();
                view.data.literal = {};
                view.data.selectedDeviceTypes = "some device types";
                spyOn(view.event, "createLiteral");
                spyOn(view.event, "updateLiteral");
            });

            it('should set assign the selected DeviceTypes to the literal', function () {
                view._onSave();
                expect(view.data.literal.DeviceTypes).toBe("some device types");
            });

            it('should call createLiteral if literal is new', function () {
                spyOn(view, "isNew").and.returnValue(true);
                view._onSave();
                expect(view.event.createLiteral).toHaveBeenCalledWith(view.data.literal);
            });

            it('should call updateLiteral if literal is not new', function () {
                spyOn(view, "isNew").and.returnValue(false);
                view._onSave();
                expect(view.event.updateLiteral).toHaveBeenCalledWith(view.data.literal);
            });
        });

        describe('onToggleDeviceType', function () {
            var view;
            beforeEach(function () {
                view = exerciseCreateView();
                view.data.selectedDeviceTypes = [];
            });

            it('should toggle the selected property', function () {
                var deviceType = {selected: false};
                view.onToggleDeviceType(deviceType);
                expect(deviceType.selected).toBe(true);
                view.onToggleDeviceType(deviceType);
                expect(deviceType.selected).toBe(false);
            });

            it('should add/remove the deviceType from the list selectedDeviceTypes depending on its selected state', function () {
                var deviceType = {selected: false};
                expect(view.data.selectedDeviceTypes.indexOf(deviceType)).toBe(-1);
                view.onToggleDeviceType(deviceType);
                expect(view.data.selectedDeviceTypes.indexOf(deviceType)).toBe(0);
                view.onToggleDeviceType(deviceType);
                expect(view.data.selectedDeviceTypes.indexOf(deviceType)).toBe(-1);
            });

            it('should display the list of selected deviceType names', function () {
                view.data.selectedDeviceTypes = [{Name: "Device1"}, {Name: "Device2"}];
                var deviceType = {Name: "Device3", selected: false};
                view.onToggleDeviceType(deviceType);
                expect(view.data.deviceTypeListPrompt).toBe("Device1, Device2, Device3");
            });

            it('should display the default prompt when there are no selected deviceTypes', function () {
                var deviceType = {Name: "Device3", selected: true};
                view.data.selectedDeviceTypes = [deviceType];
                spyOn(view.translator, "translate").and.returnValue("default prompt");
                view.onToggleDeviceType(deviceType);
                expect(view.data.deviceTypeListPrompt).toBe("default prompt");
            });
        });
    });
});
