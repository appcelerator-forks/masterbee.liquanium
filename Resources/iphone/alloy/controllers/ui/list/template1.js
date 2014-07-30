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
        height: "260dp",
        id: "template1"
    });
    $.__views.template1 && $.addTopLevelView($.__views.template1);
    $.__views.__alloyId1 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId1"
    });
    $.__views.template1.add($.__views.__alloyId1);
    $.__views.myphoto = require("liquanium").createImageView({
        id: "myphoto",
        left: "0",
        scaletofit: "true",
        image: "http://cdn2.business2community.com/wp-content/uploads/2013/01/Starbucks_Corporation_Logo_2011.svg_.png",
        height: "50dp",
        width: "50dp"
    });
    $.__views.__alloyId1.add($.__views.myphoto);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        color: "#000",
        text: "Starbuck",
        left: "60dp",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.check = require("liquanium").createImageView({
        id: "check",
        scaletofit: "true",
        height: "100dp",
        width: Ti.UI.FILL
    });
    $.__views.template1.add($.__views.check);
    $.__views.__alloyId3 = Ti.UI.createView({
        height: "100dp",
        backgroundColor: "grey",
        id: "__alloyId3"
    });
    $.__views.template1.add($.__views.__alloyId3);
    $.__views.beacon = require("liquanium").createMaskedImageView({
        id: "beacon",
        scaletofit: "true",
        height: "50dp",
        width: "50dp",
        backgroundImage: "http://www.hdwallpapers11.com/wallpapers/2880x1800/nice-flower-2880x1800.jpg",
        backgroundHeight: "28dp",
        backgroundWidth: "28dp",
        backgroundTop: "4dp",
        backgroundLeft: "11dp",
        backgroundBorderRadius: "10",
        foregroundImage: "/images/location-beacon.png"
    });
    $.__views.__alloyId3.add($.__views.beacon);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var image = args.image;
    if (image) {
        Ti.API.debug("setting image to : " + image);
        $.check.fireEvent("setimage", {
            image: image
        });
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;