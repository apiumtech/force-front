/**
 * Created by kevin on 10/27/14.
 * Modified by joanllenas 4/15/15.
 */
describe('LogErrorAspect', function () {
    var LogErrorAspect = app.getService('aspects/LogErrorAspect');

    function exerciseCreateView() {
        return { showError: function () {}, anotherPublicFunction: function () {} };
    }

    it("should call the _log function after running showError", function () {
        LogErrorAspect._log = jasmine.createSpy();

        var view = exerciseCreateView();
        LogErrorAspect.weave(view);
        view.showError({stack: "someStack"});

        expect(LogErrorAspect._log).toHaveBeenCalledWith("someStack");
    });

    it("should not call the _log function on a call to another public function that isn't showError", function () {
        LogErrorAspect._log = jasmine.createSpy();

        var view = exerciseCreateView();
        LogErrorAspect.weave(view);
        view.anotherPublicFunction();

        expect(LogErrorAspect._log).not.toHaveBeenCalled();
    });

    it('should log error.toString when error.stack is not available', function(){
        LogErrorAspect._log = jasmine.createSpy();

        var view = exerciseCreateView();
        LogErrorAspect.weave(view);
        view.showError({
            toString:function(){
                return "to string"
            }
        });

        expect(LogErrorAspect._log).toHaveBeenCalledWith("to string");
    });

    it('should call _error after throwing an exception', function(){
        var errorSpy = jasmine.createSpy();
        LogErrorAspect._error = errorSpy;

        var view = exerciseCreateView();
        view.methodThatThrows = function(){
            throw new Error("Ugly error");
        }
        LogErrorAspect.weave(view);
        try{
            view.methodThatThrows();
        }catch(err){}

        expect(errorSpy).toHaveBeenCalled();

        var errorMessage = errorSpy.calls.mostRecent().args[0];
        expect(errorMessage).toMatch(/Ugly error/);
    });
});