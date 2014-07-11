function Controller() {
    function doClick() {
        alert($.label.text);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
    $.__views.scroll = Alloy.createWidget("info.liquanium.InfiniteScroll", "widget", {
        id: "scroll",
        width: Ti.UI.FILL,
        height: "300dp",
        top: "20dp",
        __parentSymbol: $.__views.win
    });
    $.__views.scroll.setParent($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var new1 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 30,
        backgroundColor: "red"
    });
    var new2 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 30,
        backgroundColor: "blue"
    });
    var new3 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 30,
        backgroundColor: "pink"
    });
    _.each([ new1, new2, new3 ], function(elem) {
        elem.addEventListener("click", function() {
            alert("you clicked me");
        });
    });
    $.scroll.add(new1);
    setTimeout(function() {
        $.scroll.add(new2);
    }, 5e3);
    setTimeout(function() {
        $.scroll.prepend(new3);
    }, 1e4);
    $.win.open();
    __defers["$.__views.label!click!doClick"] && $.__views.label.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;