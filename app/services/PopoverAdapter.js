/**
 * Created by justin on 3/12/15.
 */

app.registerService(function () {
    function DefaultPopoverImpl(target, options) {
        $(target).popover(options);
    }

    function PopoverAdapter(popOverImplementation) {
        this.impl = popOverImplementation;
    }

    PopoverAdapter.prototype.createPopover = function (target, template, content, placement) {
        this.impl(target, {
            html: true,
            placement: placement || 'right',
            trigger: 'click',
            template: template,
            content: content
        });
    };

    PopoverAdapter.prototype.closePopover = function (target) {
        this.impl(target, 'hide');
    };

    PopoverAdapter.newInstance = function (popoverImp) {
        return Some(new PopoverAdapter(popoverImp || DefaultPopoverImpl));
    };

    return PopoverAdapter;
});