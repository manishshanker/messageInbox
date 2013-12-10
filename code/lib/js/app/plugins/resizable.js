(function ($) {
    "use strict";

    if (!$.fn.hasOwnProperty("resizable")) {

        $.fn.resizable = function (options) {

            var defaults = {
                handles: {
                    "s": ""
                },
                maxHeight: null,
                minHeight: 10
            };

            var settings = $.extend({}, defaults, options);

            var $element = $(this);
            var $handleS = $(settings.handles.s);
            var drag = false, startY, startH;

            $handleS.mousedown(function (event) {
                startY = event.clientY;
                startH = $element.height();
                drag = true;
                return false;
            });

            $(document).mouseup(function (event) {

                drag = false;

            }).mousemove(function (event) {
                if (drag) {
                    var height = startH + (event.clientY - startY);
                    if (settings.minHeight !== null && height < settings.minHeight) {
                        height = settings.minHeight;
                    } else if (settings.maxHeight !== null && height > settings.maxHeight) {
                        height = settings.maxHeight;
                    }
                    $element.height(height);
                    $element.trigger("resize", { size: {height: height} });
                    return false;
                }
            });

            return this;
        };
    }

}(jQuery));