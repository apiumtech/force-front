describe("TopMenuView", function(){
    var TopMenuView = app.getView("views/TopMenuView");

    var scope, model, presenter, $window;

    function exerciseCreateView(){
        return TopMenuView.newInstance(scope, model, presenter, $window).getOrElse(throwException("Could not create TopMenuView!"));
    }

    it('should configureEvents on instantiation', function(){
        spyOn(TopMenuView.prototype, "configureEvents");
        var view = exerciseCreateView();
        expect(view.configureEvents).toHaveBeenCalled();
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



});