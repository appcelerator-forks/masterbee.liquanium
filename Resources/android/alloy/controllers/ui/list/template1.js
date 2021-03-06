function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ui/list/template1";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.template1 = Ti.UI.createView({
        layout: "vertical",
        height: "140dp",
        id: "template1"
    });
    $.__views.template1 && $.addTopLevelView($.__views.template1);
    $.__views.label = Ti.UI.createLabel({
        text: "Template 1",
        id: "label"
    });
    $.__views.template1.add($.__views.label);
    $.__views.check = require("liquanium").createImageView({
        id: "check",
        scaletofit: "true",
        height: "100dp",
        width: Ti.UI.FILL
    });
    $.__views.template1.add($.__views.check);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var image = args.image;
    var label = args.label;
    label && ($.label.text = label);
    if (image) {
        Ti.API.debug("setting image to : " + image);
        $.check.fireEvent("setimage", {
            image: image
        });
    }
    $.check.addEventListener("click", function() {
        alert("ok you clicked me!");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;