/**
 * Created by kevin on 10/27/14.
 */
describe('LogErrorAspect', function () {
    function exerciseCreateView() {
        return { showError: function () {}, anotherPublicFunction: function () {} };
    }

    it("should call the _log function after running showError", function () {
        var LogErrorAspect = app.getService('aspects/LogErrorAspect');
        LogErrorAspect._log = jasmine.createSpy();

        var view = exerciseCreateView();
        LogErrorAspect.weave(view);
        view.showError({stack: "someStack"});

        expect(LogErrorAspect._log).toHaveBeenCalledWith("someStack");
    });

    it("should call the $apply function on a constructor", function () {
        var LogErrorAspect = app.getService('aspects/LogErrorAspect');
        LogErrorAspect._log = jasmine.createSpy();

        var view = exerciseCreateView();
        LogErrorAspect.weave(view);
        view.anotherPublicFunction();

        expect(LogErrorAspect._log).not.toHaveBeenCalled();
    });
});