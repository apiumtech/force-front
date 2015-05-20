/**
 * Created by kevin on 10/27/14.
 * Modified by joanllenas 4/15/15.
 */

define([
    'shared/aspects/LogErrorAspect'
], function(LogErrorAspect){

    describe('LogErrorAspect', function () {
            function exerciseCreateView() {
            return {
                showError: function () {
                }, anotherPublicFunction: function () {
                }
            };
        }

        it("should call the _log function after running showError", function () {
            spyOn(console, "log");

            var view = exerciseCreateView();
            LogErrorAspect.weave(view);
            view.showError({stack: "someStack"});

            expect(console.log).toHaveBeenCalledWith("someStack");
        });

        it("should not call the _log function on a call to another public function that isn't showError", function () {
            spyOn(console, "log");

            var view = exerciseCreateView();
            LogErrorAspect.weave(view);
            view.anotherPublicFunction();

            expect(console.log).not.toHaveBeenCalled();
        });

        it('should log error.toString when error.stack is not available', function () {
            spyOn(console, "log");;

            var view = exerciseCreateView();
            LogErrorAspect.weave(view);
            view.showError({
                toString: function () {
                    return "to string"
                }
            });

            expect(console.log).toHaveBeenCalledWith("to string");
        });

        it('should call _error after throwing an exception', function () {
            var warnSpy = spyOn(console, 'warn');
            LogErrorAspect._warn = warnSpy;

            var view = exerciseCreateView();
            view.methodThatThrows = function () {
                throw new Error("Ugly error");
            };
            LogErrorAspect.weave(view);
            try {
                view.methodThatThrows();
            } catch (err) {
            }

            expect(warnSpy).toHaveBeenCalled();

            var errorMessage = warnSpy.calls.mostRecent().args[0];
            expect(errorMessage).toMatch(/Ugly error/);
        });
    });
});