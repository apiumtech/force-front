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
    function ResizableTextAreaDirective($parse) {
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
                    .focus(resizeTextarea)
                    .focusout(resizeTextarea);

                // Resize based on initial value
                var modelValue = $parse(attrs.ngModel);
                scope.$watch(modelValue, function(value) {
                    var htmlElement = element[0];
                    resizeTextarea.apply( htmlElement );
                });
            },
            replace: false,
            scope: {}
        };
    }

    app.register.directive('resizableTextArea', ['$parse', ResizableTextAreaDirective]);

    return ResizableTextAreaDirective;
});