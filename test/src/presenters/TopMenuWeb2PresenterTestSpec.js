describe("TopMenuWeb2Presenter", function() {
    var TopMenuWeb2Presenter = app.getView("presenters/topMenu/TopMenuWeb2Presenter");

    function exerciseCreatePresenter() {
        return TopMenuWeb2Presenter.newInstance().getOrElse(throwInstantiateException(TopMenuWeb2Presenter));
    }

    it("should set view and model refs on show()", function(){
        var view = "i'm view";
        var model = "i'm model";
        var presenter = exerciseCreatePresenter();

        presenter.show(view, model);

        expect(presenter.view).toBe(view);
        expect(presenter.model).toBe(model);
    });

    describe('getUserDataInfo', function(){
        var presenter, view;
        beforeEach(function(){
            presenter = exerciseCreatePresenter();
            view = {
                onGetUserDataInfo: jasmine.createSpy(),
                onGetUserDataInfoError: jasmine.createSpy()
            };
            presenter.view = view;
        });
        it("should call view's onGetUserDataInfo on success", function(){
            var result = "the result";
            presenter.model = { getUserDataInfo: jasmine.createSpy().and.returnValue( exerciseFakeOkPromiseWithArg(result) ) };
            presenter.getUserDataInfo();
            expect(presenter.view.onGetUserDataInfo).toHaveBeenCalledWith(result);
        });
        it("should call view's onGetUserDataInfoError on error", function(){
            presenter.model = { getUserDataInfo: jasmine.createSpy().and.returnValue( exerciseFakeKoPromise() ) };
            presenter.getUserDataInfo();
            expect(presenter.view.onGetUserDataInfoError).toHaveBeenCalled();
        });
    });

    describe('logout', function(){
        var presenter, view;
        beforeEach(function(){
            presenter = exerciseCreatePresenter();
            view = {
                onLogout: jasmine.createSpy(),
                onLogoutError: jasmine.createSpy()
            };
            presenter.view = view;
        });
        it("should call view's onLogout on success", function(){
            var result = "the result";
            presenter.model = { logout: jasmine.createSpy().and.returnValue( exerciseFakeOkPromiseWithArg(result) ) };
            presenter.logout();
            expect(presenter.view.onLogout).toHaveBeenCalledWith(result);
        });
        it("should call view's onLogoutError on error", function(){
            presenter.model = { logout: jasmine.createSpy().and.returnValue( exerciseFakeKoPromise() ) };
            presenter.logout();
            expect(presenter.view.onLogoutError).toHaveBeenCalled();
        });
    });

    describe("get model data sync", function () {
        var presenter;
        beforeEach(function(){
            presenter = exerciseCreatePresenter();
            presenter.model = {};
        });
        [
            {functName: "getUserSections", returnVal: "aa"},
            {functName: "getUserOptions", returnVal: "bb"},
            {functName: "getUserData", returnVal: "cc"},
            {functName: "getUserNotifications", returnVal: "dd"}
        ].forEach(function (testCase) {
                it("should return '"+ testCase.returnVal +"' when '" + testCase.functName + "' called", function () {
                    presenter.model[testCase.functName] = jasmine.createSpy().and.returnValue(testCase.returnVal);
                    expect(presenter.model[testCase.functName]()).toBe(testCase.returnVal);
                });
            });
    });

});