/*===========================================
  Liquanium Image Widget
  @credits: Fokke Zandbergen ( nl.fokkezb.cachedImageView )
  @notes: A remote image cacheing widget with an indicator to use good UX design principles
 ============================================*/
var args = arguments[0] || {},
    hires = (Ti.Platform.displayCaps.density === 'high'),
    re = /(?:\.([^.]+))?$/,
    OS = Titanium.Filesystem;

function _getExtension(fn) {
    // from http://stackoverflow.com/a/680982/292947
    var tmpext = re.exec(fn)[1];
    return (tmpext) ? tmpext : '';
}

function init(args) {
    var md5, needsToSave = false,
        savedFile;
    if (args.image) {
        md5 = Ti.Utils.md5HexDigest(args.image) + _getExtension(args.image);
        savedFile = OS.getFile(Titanium.Filesystem.applicationDataDirectory, md5);
        if (savedFile.exists()) {
            $.imageView.image = savedFile;
        } else {
            needsToSave = true;
        }
    }
    if (needsToSave === true) {
        $.activityIndicator.show();
        
        $.imageView.preventDefaultImage = true;
		$.imageView.image = args.image;
		
        function saveImage(e) {
            $.imageView.removeEventListener('load', saveImage);
            $.activityIndicator.hide();
            savedFile.write(
                Ti.UI.createImageView({
                    image: args.image,
                    width: 'auto',
                    height: 'auto'
                }).toImage()
            );
        }
        $.imageView.addEventListener('load', saveImage);
    }
}
// Lets init
init(args);


// Binding methods
exports.on = exports.addEventListener = function (name, callback) {
    return $.imageView.addEventListener(name, callback);
};
exports.off = exports.removeEventListener = function (name, callback) {
    return $.imageView.removeEventListener(name, callback);
};
exports.trigger = exports.fireEvent = function (name, e) {
    return $.imageView.fireEvent(name, e);
};