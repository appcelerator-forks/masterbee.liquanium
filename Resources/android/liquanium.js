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

var IMAGEUTIL = require("liquidresources/image");

var ACTIVITYCOLOR = Ti.UI.ActivityIndicatorStyle.DARK;

exports.createViewTemplate = function(args) {
    return args;
};

exports.createButtonTemplate = function(args) {
    return args;
};

exports.createToolbar = function(args) {
    Ti.API.debug(args.children);
};

exports.createImageView = function(args) {
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
};