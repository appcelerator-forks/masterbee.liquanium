function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "info.liquanium.viewlist/" + s : s.substring(0, index) + "/info.liquanium.viewlist/" + s.substring(index + 1);
    return path;
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
    new (require("alloy/widget"))("info.liquanium.viewlist");
    this.__widgetId = "info.liquanium.viewlist";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.widget = Ti.UI.createView({
        id: "widget"
    });
    $.__views.widget && $.addTopLevelView($.__views.widget);
    $.__views.list = Ti.UI.createTableView({
        id: "list"
    });
    $.__views.widget.add($.__views.list);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var IS_IOS = true;
    IS_IOS ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK;
    var TEMPLATES = {};
    var args = arguments[0] || {};
    (function(args) {
        var i, j, _templates = args.children;
        Ti.API.error(args);
        for (i = 0, j = _templates.length; j > i; i++) {
            var name = _templates[i].name;
            Ti.API.debug("found name " + name);
            delete _templates[i].name;
            TEMPLATES[name] = _templates[i];
            Ti.API.debug(" found " + JSON.stringify(_templates[i]));
        }
    })(args);
    $.addView = function(props) {
        var template = props.template;
        delete props.template;
        var row = Ti.UI.createTableViewRow({
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL,
            className: "row" + template
        });
        IS_IOS && (row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE);
        var item = Alloy.createController(TEMPLATES[template].controller, props);
        row.add(item.getView());
        $.list.appendRow(row);
        item = null;
    };
    $.deleteView = function() {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;