describe("TopMenuWeb2View", function(){
    var TopMenuWeb2View = app.getView("views/topMenu/TopMenuWeb2View");

    var scope, model, presenter, $window;

    function exerciseCreateView(){
        return TopMenuWeb2View.newInstance(scope, model, presenter, false, false).getOrElse(throwException("Could not create TopMenuWeb2View!"));
    }

    it('should configureEvents on instantiation', function(){
        spyOn(TopMenuWeb2View.prototype, "configureEvents");
        var view = exerciseCreateView();
        expect(view.configureEvents).toHaveBeenCalled();
    });

    it('should configureData on instantiation', function(){
        spyOn(TopMenuWeb2View.prototype, "configureData");
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


    it('should get the correct template name', function(){
        var view = exerciseCreateView();
        expect(view.getMenuTemplateName()).toBe('topMenuWeb2');
    });

    it('should call getUserDataInfo onInit', function(){
        var view = exerciseCreateView();

        spyOn(view.presenter, "getUserDataInfo");
        view.onInit();

        expect(view.presenter.getUserDataInfo).toHaveBeenCalled();
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