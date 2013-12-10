(function () {
    "use strict";

    MyAPP.service.MessageBox = function () {
        return {
            getMessageList: getMessageList,
            getMessageItem: getMessageItem
        };
    };

    function getMessageList(data, callback) {
        var rt = {
            totalCount: 100,
            messages: (function (startItem, numberOfItems) {
                var i, ts = new Date(), rt = [];
                if (startItem + numberOfItems > 100) {
                    numberOfItems = 100;
                }
                console.log(numberOfItems, startItem)
                ts.setDate(ts.getDate() + startItem);
                for (i = 0; i < numberOfItems; i++) {
                    ts.setDate(ts.getDate() + i);
                    rt.push({
                        id: startItem + i,
                        title: "Message " + (startItem + i),
                        sentDate: String((ts.getDate() / 100).toFixed(2)).substring(2)
                            + "/" + String(((ts.getMonth() + 1) / 100).toFixed(2)).substring(2)
                            + "/" + ts.getFullYear()
                    });
                }
                return rt;
            }(data.startItem, data.numberOfItems))
        };
        console.log("List Request:", data, "List Response:", rt);
        callback(rt);
    }

    function getMessageItem(data, callback) {
        var rt = {
            title: "Message " + data.id,
            sentDate: "2013-10-25",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel nunc sed massa ultrices mollis. Integer eu porta eros. Duis bibendum risus ut faucibus scelerisque. Praesent vitae odio luctus, tincidunt."
        };
        console.log("Item Request:", data, "Item Response:", rt);
        callback(rt);
    }

}());