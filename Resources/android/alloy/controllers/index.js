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
    var __alloyId3 = [];
    var __alloyId5 = {
        type: "Ti.UI.View",
        bindId: "bgcolor",
        childTemplates: function() {
            var __alloyId6 = [];
            var __alloyId8 = {
                type: "Ti.UI.Label",
                properties: {
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    color: "#000",
                    text: "I am view 1 template"
                }
            };
            __alloyId6.push(__alloyId8);
            return __alloyId6;
        }(),
        properties: {
            height: "40",
            bindId: "bgcolor"
        }
    };
    __alloyId3.push(__alloyId5);
    $.__views.__alloyId2 = {
        properties: {
            name: "view1",
            id: "__alloyId2"
        },
        childTemplates: __alloyId3
    };
    __itemTemplate["view1"] = $.__views.__alloyId2;
    var __alloyId10 = [];
    var __alloyId12 = {
        type: "Ti.UI.View",
        bindId: "bgcolor",
        childTemplates: function() {
            var __alloyId13 = [];
            var __alloyId15 = {
                type: "Ti.UI.Label",
                properties: {
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    color: "#000",
                    text: "I am view 2 template"
                }
            };
            __alloyId13.push(__alloyId15);
            return __alloyId13;
        }(),
        properties: {
            height: "40",
            bindId: "bgcolor"
        }
    };
    __alloyId10.push(__alloyId12);
    $.__views.__alloyId9 = {
        properties: {
            name: "view2",
            id: "__alloyId9"
        },
        childTemplates: __alloyId10
    };
    __itemTemplate["view2"] = $.__views.__alloyId9;
    $.__views.scroll = Alloy.createWidget("info.liquanium.listview", "widget", {
        id: "scroll",
        width: Ti.UI.FILL,
        height: "300dp",
        top: "20dp",
        children: [  ],
        __parentSymbol: $.__views.win
    });
    $.__views.scroll.setParent($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.win.open();
    $.scroll.add({
        bgColor: "pink",
        template: "view1"
    });
    __defers["$.__views.label!click!doClick"] && $.__views.label.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;