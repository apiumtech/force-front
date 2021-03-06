/**
 * Created by justin on 3/12/15.
 */

define([
    'jquery'
], function ($) {
    function DefaultPopoverImpl(target, options) {
        $(target).popover(options);
    }

    function PopoverAdapter(popOverImplementation) {
        this.impl = popOverImplementation || DefaultPopoverImpl;
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
        return new PopoverAdapter(popoverImp || DefaultPopoverImpl);
    };

    return PopoverAdapter;
});