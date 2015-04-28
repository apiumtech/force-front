describe("TopMenuView", function(){
    var TopMenuView = app.getView("views/TopMenuView");
    var TopMenuWeb2View = app.getView('views/topMenu/TopMenuWeb2View');

    var $window;

    function exerciseCreateView(){
        return new TopMenuView($window);
    }


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

    it('should instantiate the correct view type', function(){
        $window = {location: {href: ""}};
        var view = exerciseCreateView();

        view.web3Urls = ["anyUrlNotMatchingLocalhost"];

        $window.location.href = "http://localhost:8081/";
        var scope = {$apply: function(){}};
        var viewInstance = view.getViewImpl(scope).getOrElse(throwException("Could not create TopMenu view instance!"));
        expect(viewInstance.getMenuTemplateName()).toBe('topMenuWeb2');
    });

});