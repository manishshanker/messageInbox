(function ($) {
    "use strict";

    var list = [], settings, tId;
    var $scroller, $list, $body;

    var startItem, numberOfItems;

    var TITLE_TEMPLATE = '<h4>{title}</h4>';
    var LIST_TEMPLATE = '<div class="{cssClassPrefix}list"><div class="{cssClassPrefix}scroller"><ul></ul></div></div>';
    var LIST_ITEM_TEMPLATE = '<li style="top:{top}px;"><span class="{cssClassPrefix}list-title">{title}</span><span class="{cssClassPrefix}list-date">{sentDate}</span></li>';
    var DIVIDER_TEMPLATE = '<div class="ui-resizable-handle ui-resizable-s {cssClassPrefix}divider"></div>';
    var BODY_TEMPLATE = '<div class="{cssClassPrefix}body"></div>';
    var BODY_CONTENT_TEMPLATE = '<h5>{title}</h5><p class="{cssClassPrefix}body-date">{sentDate}</p><p class="{cssClassPrefix}body-content">{body}</p>';

    function renderList(data) {
        var i, l, c = 0;
        $list.css("height", (data.totalCount * settings.listItemHeight) + "px");
        for (i = 0, l = data.totalCount; i < l; i++) {
            if (i >= startItem && i < startItem + numberOfItems) {
                if (list[i] === undefined) {
                    (function (i, c) {
                        list[i] = $(LIST_ITEM_TEMPLATE.supplant({
                            top: (i * settings.listItemHeight),
                            cssClassPrefix: settings.cssClassPrefix,
                            title: data.messages[c].title,
                            sentDate: data.messages[c].sentDate
                        })).bind("click", function (event) {
                            var $element = $(this);
                            $element.siblings().removeClass(settings.cssClassPrefix + "highlight");
                            $element.addClass(settings.cssClassPrefix + "highlight");
                            settings.itemContentDataProvider({ id: data.messages[c].id }, renderItem);
                        }).appendTo($list);
                    }(i, c));
                }
                ++c;
//                if (list[i] === undefined) {
//                    list[i] = $(LIST_ITEM_TEMPLATE.supplant({
//                        top: (i * settings.listItemHeight),
//                        cssClassPrefix: settings.cssClassPrefix,
//                        title: data.messages[c].title,
//                        sentDate: data.messages[c].sentDate
//                    })).appendTo($list);
//                }
//                ++c;
            } else if (list[i] !== undefined) {
                list[i].remove();
                list[i] = undefined;
            }
        }
    }

    function renderItem(data) {
        $body.html(BODY_CONTENT_TEMPLATE.supplant({
            cssClassPrefix: settings.cssClassPrefix,
            title: data.title,
            sentDate: data.sentDate,
            body: data.body
        }));
    }

    function onListScroll() {
        startItem = Math.floor($scroller.scrollTop() / settings.listItemHeight);
        settings.itemListDataProvider({ startItem: startItem, numberOfItems: numberOfItems }, renderList);
    }

    $.fn.messageBox = function (options) {

        var $component, $title, $resizable, $temp, $divider;

        var defaults = {
            title: "",
            itemListDataProvider: $.noop,
            itemContentDataProvider: $.noop,
            listItemHeight: 40,
            cssClassPrefix: "message-box-",
            scrollDelay: 500,
            verticalMargin: 10
        };

        settings = $.extend({}, defaults, options);

        $component = $(this);

        $title = $(TITLE_TEMPLATE.supplant({ title: settings.title })).appendTo($component);
        $resizable = $(LIST_TEMPLATE.supplant({ cssClassPrefix: settings.cssClassPrefix })).appendTo($component);
        $list = $resizable.find("ul");
        $scroller = $resizable.find("." + settings.cssClassPrefix + "scroller");
        $divider = $(DIVIDER_TEMPLATE.supplant({ cssClassPrefix: settings.cssClassPrefix })).insertAfter($list);
        $body = $(BODY_TEMPLATE.supplant({ cssClassPrefix: settings.cssClassPrefix })).appendTo($component);

        var component_height = $component.height(),
            title_height = $title.height(),
            divider_height = $divider.height(),
            list_height = $list.height(),
            body_height = $body.height();

        var scrollTimeoutId;
        numberOfItems = Math.ceil((component_height - title_height) / settings.listItemHeight);

        $resizable.resizable({
            handles: {
                "s": $divider
            },
            maxHeight: component_height - title_height - (2 * divider_height)
        });

        $resizable.bind("resize", function (event, data) {
            $body.height(body_height - (data.size.height - list_height));
        });

        $scroller.bind("scroll", function (event) {
            clearTimeout(scrollTimeoutId);
            scrollTimeoutId = setTimeout(onListScroll, settings.scrollDelay);
        });

        onListScroll();

        return this;
    };
}(jQuery));