/*===========================================
 Liquanium Image helper file
 @notes:
 @credits: Big thank you to Fokke Zandbergen work on his UI.js. It was a bit of a re-engineering and still needs some cleanup but
 		much of his work was repurposed here.
 ============================================*/

var ACTIVITYCOLOR = (Ti.Platform.name === 'iPhone OS') ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK;

function _getExtension(fn) {
	// from http://stackoverflow.com/a/680982/292947
	var re = /(?:\.([^.]+))?$/;
	var tmpext = re.exec(fn)[1];
	return (tmpext) ? '.' + tmpext : '';
};

function _isURL( str ) {
	return /https?\:\/\//i.test( str ) ;
}

function _destroy( object ) {
	
	if ( object.hide ){
		object.hide();
	}
	object = null;
}

/**
 * Handles the Ti.UI.View.postlayout event, takes the width and height and
 * then sets the backgroundImage.
 * @param  {Ti.Event} e
 */
function _onPostLayout(e) {
	var view = e.source;
	var size = view.size;
	// only once
	view.removeEventListener('postlayout', _onPostLayout);
	// continue now that we know width & height
	view.backgroundImage = _resizeImage(view._resizedImage, size.width, size.height);
}

/**
 * Returns the file that would keep the cached Image.
 * @param  {String} originalPath
 * @param  {String} targetId
 * @return {Ti.Filesystem.File}
 */
function _getTargetFile(originalPath) {
	var targetFilename = Ti.Utils.sha256(originalPath) + _getExtension(originalPath);
	var targetFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, targetFilename);
	return targetFile;
}

/**
 * Returns the file that would keep the resized backgroundImage.
 * @param  {String} originalPath
 * @param  {String} targetId
 * @return {Ti.Filesystem.File}
 */
function _getScaledTargetFile(originalFile, height, width) {
	var filename = originalFile.substring(originalFile.lastIndexOf("/") + 1, originalFile.lastIndexOf("."));
	var targetFilename = filename + "." + height + "x" + width + "." + _getExtension( originalFile );
	var targetFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, targetFilename);
	return targetFile;
}

/**
 * Resizes the backgroundImage.
 * @param {Ti.UI.View} view
 * @param {Number} targetWidth
 * @param {Number} targetHeight
 * @param {String} originalPath
 * @param {Ti.Filesystem.File} targetFile
 */
function _resizeImage(originalFile, targetWidth, targetHeight) {

	var targetFile = _getScaledTargetFile( originalFile.nativePath );

	if (targetFile.exists()) {
		return targetFile.nativePath;
	}
	
	if (!originalFile.exists()) {
		Ti.API.error('[Liquanium] Image not found: ' + originalFile.nativePath);
		return;
	}

	// orginal specs
	var originalBlob = originalFile.read();
	var originalWidth = originalBlob.width;
	var originalHeight = originalBlob.height;
	var originalRatio = originalWidth / originalHeight;

	// target specs (converted to px)
	targetWidth = Ti.UI.convertUnits('' + targetWidth, Ti.UI.UNIT_PX);
	targetHeight = Ti.UI.convertUnits('' + targetHeight, Ti.UI.UNIT_PX);
	var targetRatio = targetWidth / targetHeight;

	var resizeWidth, resizeHeight;

	// fill width, overflow height
	if (targetRatio > originalRatio) {
		resizeWidth = targetWidth;
		resizeHeight = Math.ceil(resizeWidth / originalRatio);
	}

	// fill height, overflow width
	else {
		resizeHeight = targetHeight;
		resizeWidth = Math.ceil(resizeHeight * originalRatio);
	}

	// resize, if neeeded
	if (originalWidth !== resizeWidth || originalHeight !== resizeHeight) {
		originalBlob = originalBlob.imageAsResized(resizeWidth, resizeHeight);
	}

	// crop, if needed
	if (resizeWidth !== targetWidth || resizeHeight !== targetHeight) {
		originalBlob = originalBlob.imageAsCropped({
			width : targetWidth,
			height : targetHeight
		});
	}

	targetFile.write(originalBlob);
	return targetFile.nativePath;
};

exports.resizeImage = _resizeImage;
/**
 * Generates or loads a resized backgroundImage, respecting the original aspect
 * ratio while making sure it covers the whole view.
 * @param {Ti.UI.View} view
 * @param {Number} targetWidth
 * @param {Number} targetHeight
 * @TODO: There is alot of conditionals in this function. Need to revist to break up into smaller functions and to streamline abit more
 */
exports.setImage = function(view, image, targetWidth, targetHeight, cover) {

	var originalPath = image,
		targetFile = _getTargetFile( originalPath );
		
	// Step 1: Lets check to see if we have a local copy of the file
	if (!targetFile.exists()) {

		//Step 1.1: Lets see if the file is a URL;
		if ( _isURL( originalPath ) ) {

			var activity = Ti.UI.createActivityIndicator({
				style : ACTIVITYCOLOR,
				message : '',
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE
			});
			// lets show some indicator we are working
			view.add( activity );

			activity.show();

			var xhr = Ti.Network.createHTTPClient();

			xhr.onload = function(e) {
				
				_destroy( activity );

				if (!targetFile.write(this.responseData)) {

					view.add(Ti.UI.createLabel({
						text : '[Liquanium] Could not write downloaded file to: ' + targetFile.nativePath,
						color: "#000"
					}));

					Ti.API.error('[Liquanium] Could not write downloaded file to: ' + targetFile.nativePath);
					return;

				} else {
					view.backgroundImage = ( cover ) ? _resizeImage(targetFile, view.size.width, view.size.height) : targetFile.nativePath;
				}
				xhr = null;
			};

			xhr.onerror = function(e) {
				
				_destroy( activity );

				view.add(Ti.UI.createLabel({
					text : '[Liquanium] Could not downloaded image: ' + e.error,
					color: "#000"
				}));
				Ti.API.error('[Liquanium] Could not downloaded image: ' + e.error);
				xhr = null;
			};

			xhr.open('GET', originalPath);
			xhr.send();

			return view;

		} else {
			Ti.API.debug("[Liquanium] File is local but not cached");
			
			if ( cover ) {
				
				view._resizedImage = targetFile;
				if ( view._isPostLayed ) {
					
					_onPostLayout({
						source : view,
					});
					
				}else {
					view.addEventListener("postlayout", _onPostLayout);
				}
				
			
				return view;
				
			} else {
				
				view.backgroundImage = targetFile.nativePath;
			}
			
		}
	} else {
		Ti.API.debug("[Liquanium] File is cached ");
		
		if ( cover ) {
			view._resizedImage = targetFile;
			if ( view._isPostLayed ) {
					
					_onPostLayout({
						source : view,
					});
					
				}else {
					view.addEventListener("postlayout", _onPostLayout);
				}
			
		} else {
			view.backgroundImage = targetFile.nativePath;
		}
	}
	return view;
};
