(function ($) {
    "use strict";

    var service = new MyAPP.service.MessageBox();

    $(".message-box").messageBox({
        title: "Email Component",
        itemListDataProvider: service.getMessageList,
        itemContentDataProvider: service.getMessageItem
    });

}(jQuery));