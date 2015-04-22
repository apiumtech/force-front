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

    it('should get the correct template name', function(){
        $window = {
            location: {
                href: "http://localhost:8081"
            }
        };
        var view = exerciseCreateView();

        view.web3Urls = ["localhost", "127.0.0.1"];
        expect(view.getMenuTemplateName()).toBe(TopMenuView.WEB3_TEMPLATE_NAME);

        $window.location.href = "https://web.forcemanager.net/";
        expect(view.getMenuTemplateName()).toBe(TopMenuView.WEB2_TEMPLATE_NAME);
    });


});