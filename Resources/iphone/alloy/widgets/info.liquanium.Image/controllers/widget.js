function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "info.liquanium.Image/" + s : s.substring(0, index) + "/info.liquanium.Image/" + s.substring(index + 1);
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
    function _getExtension(fn) {
        var tmpext = re.exec(fn)[1];
        return tmpext ? tmpext : "";
    }
    function init(args) {
        function saveImage() {
            $.imageView.removeEventListener("load", saveImage);
            $.activityIndicator.hide();
            savedFile.write(Ti.UI.createImageView({
                image: args.image,
                width: "auto",
                height: "auto"
            }).toImage());
        }
        var md5, savedFile, needsToSave = false;
        if (args.image) {
            md5 = Ti.Utils.md5HexDigest(args.image) + _getExtension(args.image);
            savedFile = OS.getFile(Titanium.Filesystem.applicationDataDirectory, md5);
            savedFile.exists() ? $.imageView.image = savedFile : needsToSave = true;
        }
        if (true === needsToSave) {
            $.activityIndicator.show();
            $.imageView.preventDefaultImage = true;
            $.imageView.image = args.image;
            $.imageView.addEventListener("load", saveImage);
        }
    }
    new (require("alloy/widget"))("info.liquanium.Image");
    this.__widgetId = "info.liquanium.Image";
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
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading...",
        zIndex: ""
    });
    $.__views.widget.add($.__views.activityIndicator);
    $.__views.imageView = Ti.UI.createImageView({
        id: "imageView",
        zIndex: "2"
    });
    $.__views.widget.add($.__views.imageView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, re = ("high" === Ti.Platform.displayCaps.density, 
    /(?:\.([^.]+))?$/), OS = Titanium.Filesystem;
    init(args);
    exports.on = exports.addEventListener = function(name, callback) {
        return $.imageView.addEventListener(name, callback);
    };
    exports.off = exports.removeEventListener = function(name, callback) {
        return $.imageView.removeEventListener(name, callback);
    };
    exports.trigger = exports.fireEvent = function(name, e) {
        return $.imageView.fireEvent(name, e);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;