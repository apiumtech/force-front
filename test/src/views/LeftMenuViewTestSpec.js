/**
 * Created by kevin on 11/6/14.
 */
describe("LeftMenuView", function () {
    var LeftMenuView = app.getView('views/LeftMenuView');

    function exerciseCreateView(presenter) {
        return LeftMenuView.newInstance({}, presenter || {
            show: function () {
            }
        }, false, false).getOrElse(throwException("Could not create LeftMenuView!"));
    }

    it("should call presenter's show method on show()", function () {
        var view = exerciseCreateView({show: jasmine.createSpy()});
        view.show();
        expect(view.presenter.show).toHaveBeenCalledWith(view);
    });

    it("toggleColumn should show submenu elements", function () {
        var view = exerciseCreateView();

        var e = document.createElement("ul");
        e.setAttribute("class", "sub-menu");
        document.getElementsByTagName('body')[0].appendChild(e);

        view.fn.toggleAnalyticsSubmenu(e);
        expect(e.style.display).toEqual('');
    });
});