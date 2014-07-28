function _getExtension(fn) {
    var re = /(?:\.([^.]+))?$/;
    var tmpext = re.exec(fn)[1];
    return tmpext ? tmpext : "";
}

function _getLaid(e) {
    var element = e.source;
    element.removeEventListener("postlayout", _getLaid);
    e.source._isPostLayed = true;
}

function _isAbsolute(dimension) {
    return dimension && dimension.toString().match(/^[1-9]+[0-9]*[a-z]*$/);
}

var IMAGE = require("liquidresources/image");

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

exports.createImageView = function(args) {
    var image = args.image;
    var behaviour = args.scaletofit;
    delete args.image;
    var view = Ti.UI.createView(args);
    view.addEventListener("postlayout", _getLaid);
    image && IMAGE.setImage(view, image, args.width, args.height, behaviour);
    view.addEventListener("setimage", function(e) {
        Ti.API.info(JSON.stringify(e));
        IMAGE.setImage(e.source, e.image, e.source.width, e.source.height, e.source.scaletofit);
    });
    return view;
};