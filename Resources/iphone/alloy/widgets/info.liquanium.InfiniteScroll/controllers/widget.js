function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "info.liquanium.InfiniteScroll/" + s : s.substring(0, index) + "/info.liquanium.InfiniteScroll/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function _getTrueHeight(e) {
        var _element = e.source, parentNode = _element.getParent();
        _element.removeEventListener("postlayout", _getTrueHeight);
        parentNode._queue -= 1;
        Ti.API.debug(parentNode._queue);
        parentNode._contentHeight += e.source.size.height;
        parentNode.fireEvent("changed", {});
    }
    function _changed(e) {
        var node = e.source;
        if (1 > node._queue) {
            node.fireEvent("completed", {});
            node._queue = 0;
        }
    }
    function _completed(e) {
        var node = e.source;
        node.removeEventListener("completed", _completed);
        Ti.API.debug("===============================");
        Ti.API.debug(" HIDDEN HEIGHT " + hidden._contentHeight);
        Ti.API.debug(" VISIBLE HEIGHT " + visible._contentHeight);
        Ti.API.debug("===============================");
        hidden._contentHeight - visible._contentHeight;
    }
    function _sanitize(views) {
        return _.isArray(views) ? views : [ views ];
    }
    function addToScroll(views) {
        var _views = _sanitize(views), _viewport = $.canvas.children[visiblescroll];
        visible._queue = _views.length;
        for (var i = 0, j = _views.length; j > i; i++) {
            _views[i].addEventListener("postlayout", _getTrueHeight);
            _viewport.add(_views[i]);
        }
        return true;
    }
    function add(views) {
        return addToScroll(views);
    }
    function append(views) {
        addToScroll(views);
    }
    function prepend(views) {
        1 > visible.getChildren().length && addToScroll(views);
        views = _sanitize(views);
        var _arrayofviews = visible.getChildren(), _complete = views.concat(_arrayofviews);
        hidden._queue = _complete.length;
        for (var i = 0, j = _complete.length; j > i; i++) {
            Ti.API.debug("adding > " + _complete[i].apiName);
            _complete[i].addEventListener("postlayout", _getTrueHeight);
            hidden.add(_complete[i]);
        }
        hidden.addEventListener("completed", _completed);
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
    $.__views.__alloyId0 = Ti.UI.createListView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "5",
        seperatorColor: "transparent",
        layout: "vertical",
        id: "__alloyId0"
    });
    $.__views.canvas.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createListView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "4",
        seperatorColor: "transparent",
        layout: "vertical",
        id: "__alloyId1"
    });
    $.__views.canvas.add($.__views.__alloyId1);
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
    var visible, hidden, args = arguments[0] || {}, IS_IOS = true, hiddenscroll = 2, visiblescroll = 1;
    delete args.id;
    (function(args, $) {
        visible = $.canvas.children[visiblescroll], hidden = $.canvas.children[hiddenscroll];
        visible._contentHeight = hidden._contentHeight = 0;
        visible.addEventListener("changed", _changed);
        hidden.addEventListener("changed", _changed);
        $.pullindicator.style = $.pushindicator.style = IS_IOS ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK;
        $.canvas.applyProperties(args);
        $.pullindicator.show();
        $.pushindicator.show();
    })(args, $);
    exports.add = add;
    exports.prepend = prepend;
    exports.append = append;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;