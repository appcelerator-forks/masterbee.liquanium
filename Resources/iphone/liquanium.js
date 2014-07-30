function firstToLowerCase(str) {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}

function _getExtension(fn) {
    var re = /(?:\.([^.]+))?$/;
    var tmpext = re.exec(fn)[1];
    return tmpext ? tmpext : "";
}

function processImage(e) {
    var element = e.source, args = element._liquaniumImage;
    e.image && (args.image = element._liquaniumImage.image = e.image);
    if ("postlayout" === e.type) {
        element.removeEventListener("postlayout", processImage);
        args.width = element._liquaniumImage.width = element.size.width;
        args.height = element._liquaniumImage.height = element.size.height;
        args._isLayedOut = element._liquaniumImage._isLayedOut = true;
    }
    Ti.API.error("testing on > " + e.type + " [properties] : hasLayout: " + args._isLayedOut + " containsImage: " + args.image);
    element._liquaniumImage = args;
    if (args._isLayedOut && args.image) return IMAGEUTIL.processImage(element, args);
}

function createImage(args) {
    var image = {
        image: args.image,
        width: args.width,
        height: args.height,
        scaletofit: args.scaletofit
    };
    args.image;
    delete args.image;
    delete args.id;
    var imageView = Ti.UI.createImageView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        zIndex: 3,
        preventDefaultImage: true
    });
    var viewport = Ti.UI.createView(args);
    if ("undefined" == typeof args.noindicator) {
        viewport.add(Ti.UI.createActivityIndicator({
            style: ACTIVITYCOLOR,
            message: "",
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            zIndex: 2
        }));
        image.hasIndicator = true;
    }
    viewport._liquaniumImage = image;
    viewport.add(imageView);
    viewport.addEventListener("setimage", processImage);
    viewport.addEventListener("postlayout", processImage);
    return viewport;
}

var IMAGEUTIL = require("liquidresources/image");

var ACTIVITYCOLOR = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;

exports.createViewTemplate = function(args) {
    return args;
};

exports.createButtonTemplate = function(args) {
    return args;
};

exports.createToolbar = function(args) {
    Ti.API.debug(args.children);
};

exports.createMaskedImageView = function(args) {
    var bImage = args.backgroundImage, fImage = args.foregroundImage;
    Ti.API.error(args);
    delete args.backgroundImage;
    delete args.foregroundImage;
    var viewport = Ti.UI.createView(args);
    var background = createImage({
        image: bImage,
        top: 0,
        backgroundColor: "transparent",
        left: 0,
        zIndex: 2,
        preventDefaultImage: true
    });
    _.each(args, function(property, key) {
        if (-1 !== key.indexOf("background")) {
            var _property = firstToLowerCase(key.replace("background", ""));
            background[_property] = property;
        }
    });
    var foreground = createImage({
        image: fImage,
        top: 0,
        backgroundColor: "transparent",
        left: 0,
        zIndex: 5,
        preventDefaultImage: true
    });
    viewport.add(background);
    viewport.add(foreground);
    return viewport;
};

exports.createImageView = createImage;