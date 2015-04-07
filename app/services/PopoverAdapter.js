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

    PopoverAdapter.prototype.createPopover = function (target, template, content, placement, trigger) {
        this.impl(target, {
            html: true,
            placement: placement || 'right',
            trigger: trigger || 'manual',
            template: template,
            content: content
        });
    };

    PopoverAdapter.prototype.closePopover = function (target) {
        this.impl(target, 'hide');
    };

    PopoverAdapter.prototype.openPopover = function (target) {
        this.impl(target, 'show');
    };

    PopoverAdapter.newInstance = function (popoverImp) {
        return Some(new PopoverAdapter(popoverImp || DefaultPopoverImpl));
    };

    return PopoverAdapter;
});