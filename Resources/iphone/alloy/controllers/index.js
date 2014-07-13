function Controller() {
    function doClick() {
        alert($.label.text);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var __itemTemplate = arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
    var __alloyId2 = [];
    var __alloyId4 = {
        type: "Ti.UI.View",
        bindId: "bgcolor",
        childTemplates: function() {
            var __alloyId5 = [];
            var __alloyId7 = {
                type: "Ti.UI.Label",
                properties: {
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    color: "#000",
                    text: "I am view 1 template"
                }
            };
            __alloyId5.push(__alloyId7);
            return __alloyId5;
        }(),
        properties: {
            height: "40",
            bindId: "bgcolor"
        }
    };
    __alloyId2.push(__alloyId4);
    $.__views.me = {
        properties: {
            name: "view1",
            id: "me"
        },
        childTemplates: __alloyId2
    };
    __itemTemplate["view1"] = $.__views.me;
    $.__views.scroll = Alloy.createWidget("info.liquanium.listview", "widget", {
        id: "scroll",
        width: Ti.UI.FILL,
        height: "300dp",
        top: "20dp",
        children: [],
        __parentSymbol: $.__views.win
    });
    $.__views.scroll.setParent($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.win.open();
    $.scroll.append({
        bgcolor: "pink",
        template: "view1"
    });
    __defers["$.__views.label!click!doClick"] && $.__views.label.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;