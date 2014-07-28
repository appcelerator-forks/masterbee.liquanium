function _getExtension(fn) {
    var re = /(?:\.([^.]+))?$/;
    var tmpext = re.exec(fn)[1];
    return tmpext ? "." + tmpext : "";
}

function _isURL(str) {
    return /https?\:\/\//i.test(str);
}

function _destroy(object) {
    object.hide && object.hide();
    object = null;
}

function _onPostLayout(e) {
    var view = e.source;
    var size = view.size;
    view.removeEventListener("postlayout", _onPostLayout);
    view.backgroundImage = _resizeImage(view._resizedImage, size.width, size.height);
}

function _getTargetFile(originalPath) {
    var targetFilename = Ti.Utils.sha256(originalPath) + _getExtension(originalPath);
    var targetFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, targetFilename);
    return targetFile;
}

function _getScaledTargetFile(originalFile, height, width) {
    var filename = originalFile.substring(originalFile.lastIndexOf("/") + 1, originalFile.lastIndexOf("."));
    var targetFilename = filename + "." + height + "x" + width + "." + _getExtension(originalFile);
    var targetFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, targetFilename);
    return targetFile;
}

function _resizeImage(originalFile, targetWidth, targetHeight) {
    var targetFile = _getScaledTargetFile(originalFile.nativePath);
    if (targetFile.exists()) return targetFile.nativePath;
    if (!originalFile.exists()) {
        Ti.API.error("[Liquanium] Image not found: " + originalFile.nativePath);
        return;
    }
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
    return targetFile.nativePath;
}

var ACTIVITYCOLOR = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;

exports.resizeImage = _resizeImage;

exports.setImage = function(view, image, targetWidth, targetHeight, cover) {
    var originalPath = image, targetFile = _getTargetFile(originalPath);
    if (targetFile.exists()) {
        Ti.API.debug("[Liquanium] File is cached ");
        if (cover) {
            view._resizedImage = targetFile;
            view._isPostLayed ? _onPostLayout({
                source: view
            }) : view.addEventListener("postlayout", _onPostLayout);
        } else view.backgroundImage = targetFile.nativePath;
    } else {
        if (_isURL(originalPath)) {
            var activity = Ti.UI.createActivityIndicator({
                style: ACTIVITYCOLOR,
                message: "",
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE
            });
            view.add(activity);
            activity.show();
            var xhr = Ti.Network.createHTTPClient();
            xhr.onload = function() {
                _destroy(activity);
                if (!targetFile.write(this.responseData)) {
                    view.add(Ti.UI.createLabel({
                        text: "[Liquanium] Could not write downloaded file to: " + targetFile.nativePath,
                        color: "#000"
                    }));
                    Ti.API.error("[Liquanium] Could not write downloaded file to: " + targetFile.nativePath);
                    return;
                }
                view.backgroundImage = cover ? _resizeImage(targetFile, view.size.width, view.size.height) : targetFile.nativePath;
                xhr = null;
            };
            xhr.onerror = function(e) {
                _destroy(activity);
                view.add(Ti.UI.createLabel({
                    text: "[Liquanium] Could not downloaded image: " + e.error,
                    color: "#000"
                }));
                Ti.API.error("[Liquanium] Could not downloaded image: " + e.error);
                xhr = null;
            };
            xhr.open("GET", originalPath);
            xhr.send();
            return view;
        }
        Ti.API.debug("[Liquanium] File is local but not cached");
        if (cover) {
            view._resizedImage = targetFile;
            view._isPostLayed ? _onPostLayout({
                source: view
            }) : view.addEventListener("postlayout", _onPostLayout);
            return view;
        }
        view.backgroundImage = targetFile.nativePath;
    }
    return view;
};