function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doClick() {
        alert($.label.text);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win",
        layout: "vertical"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Hello, World",
        id: "label",
        top: "30dp"
    });
    $.__views.win.add($.__views.label);
    doClick ? $.__views.label.addEventListener("click", doClick) : __defers["$.__views.label!click!doClick"] = true;
    $.__views.__alloyId0 = require("liquanium").createViewTemplate({
        name: "template1",
        controller: "ui/list/template1",
        id: "__alloyId0"
    });
    $.__views.mylist = Alloy.createWidget("info.liquanium.viewlist", "widget", {
        id: "mylist",
        children: [ $.__views.__alloyId0 ],
        __parentSymbol: $.__views.win
    });
    $.__views.mylist.setParent($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("liquanium");
    $.win.open();
    for (var i = 0, j = 10; j > i; i++) $.mylist.addView({
        template: "template1",
        label: "Ok I AM NUMBER " + i,
        image: "http://static.panoramio.com/photos/large/79661170.jpg"
    });
    __defers["$.__views.label!click!doClick"] && $.__views.label.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;