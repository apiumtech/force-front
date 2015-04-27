describe("TopMenuView", function(){
    var TopMenuView = app.getView("views/TopMenuView");

    var scope, model, presenter, $window;

    function exerciseCreateView(){
        return TopMenuView.newInstance(scope, model, presenter, $window, false, false).getOrElse(throwException("Could not create TopMenuView!"));
    }

    it('should configureEvents on instantiation', function(){
        spyOn(TopMenuView.prototype, "configureEvents");
        var view = exerciseCreateView();
        expect(view.configureEvents).toHaveBeenCalled();
    });

    it('should configureData on instantiation', function(){
        spyOn(TopMenuView.prototype, "configureData");
        var view = exerciseCreateView();
        expect(view.configureData).toHaveBeenCalled();
    });


    describe('notifications', function(){
        var view;
        beforeEach(function(){
            view = exerciseCreateView();
        });
        it('should know if hasEventsForToday', function(){
            view.data.eventsForToday = 0;
            expect(view.hasEventsForToday()).toBe(false);

            view.data.eventsForToday = 1;
            expect(view.hasEventsForToday()).toBe(true);
        });

        it('should know if hasTasksForToday', function(){
            view.data.tasksForToday = 0;
            expect(view.hasTasksForToday()).toBe(false);

            view.data.tasksForToday = 6;
            expect(view.hasTasksForToday()).toBe(true);
        });

        it('should know if hasEventsOrTasksForToday', function(){
            view.data.tasksForToday = 0;
            view.data.eventsForToday = 0;
            expect(view.hasEventsOrTasksForToday()).toBe(false);

            view.data.tasksForToday = 1;
            view.data.eventsForToday = 0;
            expect(view.hasEventsOrTasksForToday()).toBe(true);

            view.data.tasksForToday = 0;
            view.data.eventsForToday = 1;
            expect(view.hasEventsOrTasksForToday()).toBe(true);
        });

        it('should know if hasUnreadNotifications', function(){
            view.data.unreadNotifications = 0;
            expect(view.hasUnreadNotifications()).toBe(false);

            view.data.unreadNotifications = 10;
            expect(view.hasUnreadNotifications()).toBe(true);
        });
    });


    it('should know if we are in web2 or inweb3', function(){
        $window = {location: {href: ""}};
        var view = exerciseCreateView();

        view.web3Urls = ["localhost", "127.0.0.1", "54.171.216.35"];

        $window.location.href = "http://localhost:8081/";
        expect(view.inWeb3()).toBe(true);

        $window.location.href = "http://54.171.216.35:8081/";
        expect(view.inWeb3()).toBe(true);

        $window.location.href = "https://web.forcemanager.net/";
        expect(view.inWeb3()).toBe(false);
    });

    it('should get the correct template name', function(){
        var view = exerciseCreateView();

        var spyInWeb3 = spyOn(view, "inWeb3");

        spyInWeb3.and.returnValue(true);
        expect(view.getMenuTemplateName()).toBe(TopMenuView.WEB3_TEMPLATE_NAME);

        spyInWeb3.and.returnValue(false);
        expect(view.getMenuTemplateName()).toBe(TopMenuView.WEB2_TEMPLATE_NAME);
    });

    it('should call the correct onInit', function(){
        var view = exerciseCreateView();

        var spyInWeb3 = spyOn(view, "inWeb3");

        spyInWeb3.and.returnValue(true);
        spyOn(view, "onInitWeb3");
        view.onInit();
        expect(view.onInitWeb3).toHaveBeenCalled();

        spyInWeb3.and.returnValue(false);
        spyOn(view, "onInitWeb2");
        view.onInit();
        expect(view.onInitWeb2).toHaveBeenCalled();
    });

    it('should set user data onGetUserDataInfo', function(){
        presenter = {};
        presenter.getUserSections = jasmine.createSpy();
        presenter.getUserOptions = jasmine.createSpy();
        presenter.getUserData = jasmine.createSpy();
        presenter.getUserNotifications = jasmine.createSpy().and.returnValue({
            notifications: 1,
            tasks: 2,
            events: 3
        });

        var view = exerciseCreateView();
        view.onGetUserDataInfo();

        expect(presenter.getUserSections).toHaveBeenCalled();
        expect(presenter.getUserOptions).toHaveBeenCalled();
        expect(presenter.getUserData).toHaveBeenCalled();
        expect(presenter.getUserNotifications).toHaveBeenCalled();
        expect(view.data.unreadNotifications).toBe(1);
        expect(view.data.tasksForToday).toBe(2);
        expect(view.data.eventsForToday).toBe(3);
    });

    it('should set errorMessage onGetUserDataInfoError', function(){
        var view = exerciseCreateView();
        view.onGetUserDataInfoError("An error");
        expect(view.data.currentError).toBe("An error");
    });


});