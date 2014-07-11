function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "info.liquanium.InfiniteScroll/" + s : s.substring(0, index) + "/info.liquanium.InfiniteScroll/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    function _sanitize(views) {
        return _.isArray(views) ? views : [ views ];
    }
    function _switchScrolls() {
        $.canvas.children[visiblescroll].zIndex = 4;
        $.canvas.children[hiddenscroll].zIndex = 5;
        _resetCanvas();
    }
    function _resetCanvas() {
        var visible = visiblescroll;
        visiblescroll = hiddenscroll;
        hiddenscroll = visible;
        var back = $.canvas.children[hiddenscroll];
        back.setContentOffset({
            x: 0,
            y: 0
        }, {
            animate: false
        });
        if (back.children[0].children && back.children[0].children.length > 0) {
            var children = back.children[0].children.slice(0);
            var numChildren = children.length;
            for (i = 0; numChildren > i; i++) back.children[0].remove(children[i]);
        }
    }
    function addToScroll(views) {
        var _views = _sanitize(views);
        for (var i = 0, j = _views.length; j > i; i++) $.canvas.children[visiblescroll].children[0].add(_views[i]);
        return true;
    }
    function add(views) {
        return addToScroll(views);
    }
    function append(views) {
        addToScroll(views);
    }
    function prepend(views) {
        1 > $.canvas.children[visiblescroll].children[0].children && addToScroll(views);
        views = _sanitize(views);
        var workerscroller = $.canvas.children[hiddenscroll].children[0], _arrayofviews = $.canvas.children[visiblescroll].children[0].children.slice(0), _complete = views.concat(_arrayofviews);
        for (var i = 0, j = _complete.length; j > i; i++) {
            Ti.API.debug("adding > " + _complete[i].apiName);
            workerscroller.add(_complete[i]);
        }
        _switchScrolls();
        return true;
    }
    new (require("alloy/widget"))("info.liquanium.InfiniteScroll");
    this.__widgetId = "info.liquanium.InfiniteScroll";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.canvas = Ti.UI.createView({
        id: "canvas"
    });
    $.__views.canvas && $.addTopLevelView($.__views.canvas);
    $.__views.pull = Ti.UI.createView({
        id: "pull",
        top: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        zIndex: "1"
    });
    $.__views.canvas.add($.__views.pull);
    $.__views.pullindicator = Ti.UI.createActivityIndicator({
        id: "pullindicator",
        visible: "true"
    });
    $.__views.pull.add($.__views.pullindicator);
    $.__views.__alloyId0 = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "5",
        verticalBounce: "true",
        layout: "vertical",
        id: "__alloyId0"
    });
    $.__views.canvas.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createView({
        top: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createView({
        top: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId2"
    });
    $.__views.__alloyId0.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "4",
        verticalBounce: "true",
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.canvas.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createView({
        top: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createView({
        top: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId5"
    });
    $.__views.__alloyId3.add($.__views.__alloyId5);
    $.__views.push = Ti.UI.createView({
        id: "push",
        bottom: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        zIndex: "1"
    });
    $.__views.canvas.add($.__views.push);
    $.__views.pushindicator = Ti.UI.createActivityIndicator({
        id: "pushindicator",
        visible: "true"
    });
    $.__views.push.add($.__views.pushindicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, IS_IOS = false, hiddenscroll = 2, visiblescroll = 1;
    delete args.id;
    $.canvas.children[visiblescroll].children[0].layout = $.canvas.children[hiddenscroll].children[0].layout = "vertical";
    $.canvas.children[visiblescroll].children[1].backgroundColor = $.canvas.children[hiddenscroll].children[1].backgroundColor = $.canvas.children[visiblescroll].children[0].backgroundColor = $.canvas.children[hiddenscroll].children[0].backgroundColor = args.backgroundColor ? args.backgroundColor : "#fff";
    $.canvas.applyProperties(args);
    $.pullindicator.style = $.pushindicator.style = IS_IOS ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK;
    exports.add = add;
    exports.prepend = prepend;
    exports.append = append;
    $.pullindicator.show();
    $.pushindicator.show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;