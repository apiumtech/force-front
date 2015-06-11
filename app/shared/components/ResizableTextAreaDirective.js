define([
    'app'
], function (app) {
    'use strict';

    /**
     * Just add the directive to a textarea component and it will automatically
     * grow/shrink while you add/remove line breaks or when text is wrapped and
     * there's a need for a new line.
     *
     * Example:
     * <textarea resizable-text-area class="form-control" rows="1"></textarea>
     */
    function ResizableTextAreaDirective() {
        return {
            link: function (scope, element, attrs) {
                $(element).css("overflow", "hidden");
                var resizeTextarea = function() {
                    this.style.height = "";
                    var
                        $this = $(this),
                        outerHeight = $this.outerHeight(),
                        scrollHeight = this.scrollHeight,
                        innerHeight = $this.innerHeight(),
                        magic = outerHeight - innerHeight;
                    this.style.height = scrollHeight + magic + "px";
                };
                $(element)
                    .keydown(resizeTextarea)
                    .keyup(resizeTextarea)
                    .change(resizeTextarea)
                    .focus(resizeTextarea);
            },
            replace: false,
            scope: {}
        };
    }

    app.register.directive('resizableTextArea', [ResizableTextAreaDirective]);

    return ResizableTextAreaDirective;
});