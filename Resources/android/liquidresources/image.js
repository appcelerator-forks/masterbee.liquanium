function getExtension(fn) {
    var re = /(?:\.([^.]+))?$/;
    var tmpext = re.exec(fn)[1];
    return tmpext ? tmpext : "";
}

function isURL(str) {
    return str ? /https?\:\/\//i.test(str) : false;
}

function showActivity(view) {
    view.children.length > 1 && view.children[0].show();
}

function hideActivity(view) {
    view.children.length > 1 && view.children[0].hide();
}

function bindImage(view) {
    var args = view._liquaniumImage, depth = view.children.length - 1, localResource = args.scaletofit ? resizeImage(args.image, args.height, args.width) : getTargetFile(args.image);
    view.children[depth].image = localResource.nativePath;
    animation.popIn(view);
}

function getScaledFile(originalPath, height, width) {
    var extension = getExtension(originalPath), shaDigest = Ti.Utils.md5HexDigest(originalPath), targetFilename = shaDigest + "." + height + "x" + width + "." + extension, targetFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, targetFilename);
    return targetFile;
}

function getTargetFile(originalPath) {
    var extension = getExtension(originalPath), shaDigest = Ti.Utils.md5HexDigest(originalPath), targetFilename = shaDigest + "." + extension, targetFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, targetFilename);
    return targetFile;
}

function resizeImage(originalPath, height, width) {
    var targetFile = getScaledFile(originalPath, height, width);
    if (targetFile.exists()) return targetFile;
    var targetWidth = width, targetHeight = height, originalFile = getTargetFile(originalPath);
    var originalBlob = originalFile.read();
    var originalWidth = originalBlob.width;
    var originalHeight = originalBlob.height;
    var originalRatio = originalWidth / originalHeight;
    targetWidth = Ti.UI.convertUnits("" + targetWidth, Ti.UI.UNIT_PX);
    targetHeight = Ti.UI.convertUnits("" + targetHeight, Ti.UI.UNIT_PX);
    var targetRatio = targetWidth / targetHeight;
    var resizeWidth, resizeHeight;
    if (targetRatio > originalRatio) {
        resizeWidth = targetWidth;
        resizeHeight = Math.ceil(resizeWidth / originalRatio);
    } else {
        resizeHeight = targetHeight;
        resizeWidth = Math.ceil(resizeHeight * originalRatio);
    }
    (originalWidth !== resizeWidth || originalHeight !== resizeHeight) && (originalBlob = originalBlob.imageAsResized(resizeWidth, resizeHeight));
    (resizeWidth !== targetWidth || resizeHeight !== targetHeight) && (originalBlob = originalBlob.imageAsCropped({
        width: targetWidth,
        height: targetHeight
    }));
    targetFile.write(originalBlob);
    return targetFile;
}

function cacheFile(view) {
    var args = view._liquaniumImage, targetFile = args.image;
    var cacheFile = getTargetFile(targetFile);
    if (isURL(targetFile)) {
        showActivity(view);
        xhr.get(targetFile, function(e) {
            hideActivity(view);
            if (!cacheFile.write(e.data)) {
                view.add(Ti.UI.createLabel({
                    text: "[Liquanium] Could not write downloaded file to: " + cacheFile.nativePath,
                    color: "#000",
                    left: 10,
                    right: 10,
                    width: Ti.UI.FILL,
                    height: Ti.UI.SIZE
                }));
                Ti.API.error("[Liquanium] Could not write downloaded file to: " + cacheFile.nativePath);
                return;
            }
            bindImage(view);
        }, function(e) {
            hideActivity(view);
            view.add(Ti.UI.createLabel({
                text: "[Liquanium] Could not downloaded image: " + e.error,
                color: "#000",
                left: 10,
                right: 10,
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE
            }));
            Ti.API.error("[Liquanium] Could not downloaded image: " + e.error);
        }, {
            contentType: "image/*"
        });
    } else bindImage(view);
}

var ACTIVITYCOLOR = Ti.UI.ActivityIndicatorStyle.DARK;

var XHR = require("liquidresources/httpclient");

var xhr = new XHR();

var animation = require("alloy/animation");

xhr.clean();

exports.processImage = function(view, args) {
    Ti.API.error("Trigger event >> processImage  base args : " + JSON.stringify(args));
    var targetFile = getTargetFile(args.image);
    if (targetFile.exists()) {
        Ti.API.error("[Liquanium] File already in cache so  >> " + targetFile.nativePath);
        bindImage(view);
    } else {
        Ti.API.error("[Liquanium] Calling Cache Builder for >> " + targetFile.nativePath);
        cacheFile(view);
    }
};