function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "info.liquanium.listview/" + s : s.substring(0, index) + "/info.liquanium.listview/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function append() {
        Ti.UI.createListSection();
    }
    new (require("alloy/widget"))("info.liquanium.listview");
    this.__widgetId = "info.liquanium.listview";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
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
    $.__views.list = Ti.UI.createListView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "list",
        seperatorColor: "transparent",
        layout: "vertical"
    });
    $.__views.canvas.add($.__views.list);
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
    var args = arguments[0] || {}, templates = args.children, IS_IOS = false, activityType = IS_IOS ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK;
    (function(args, $) {
        delete args.id;
        $.canvas.applyProperties(args);
        Ti.API.debug(JSON.stringify(templates));
        _.each([ $.pullindicator, $.pushindicator ], function(obj) {
            obj.style = activityType;
            obj.show();
        });
        Ti.API.debug(JSON.stringify($.list));
        IS_IOS ? $.list.applyProperties({
            seperatorStyle: Ti.UI.iPhone.ListViewSeparatorStyle.NONE,
            separatorInsets: {
                left: 0,
                right: 0
            }
        }) : $.list.applyProperties({
            softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS
        });
    })(args, $);
    exports.append = append;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;