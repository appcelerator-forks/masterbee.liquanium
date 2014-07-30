/*===========================================
 Liquanium Image helper file
 @notes:
 @credits: Big thank you to Fokke Zandbergen work on his UI.js. It was a bit of a re-engineering and still needs some cleanup but
 much of his work was repurposed here.
 ============================================*/

var ACTIVITYCOLOR = (Ti.Platform.name === 'iPhone OS') ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK;

// Lets leverage liquaniums' interal cacheing HTTPClient
var XHR = require('liquidresources/httpclient');
var xhr = new XHR();
var animation = require('alloy/animation');

// Delete all expired documents (this method should be called at least once in your app, so we will do it hear to ensure it is run)
xhr.clean();

function getExtension(fn) {
	// from http://stackoverflow.com/a/680982/292947
	var re = /(?:\.([^.]+))?$/;
	var tmpext = re.exec(fn)[1];
	return (tmpext) ? tmpext : '';
};

function isURL(str) {
	return ( str ) ? /https?\:\/\//i.test(str) : false;
}

function showActivity(view) {
	if (view.children.length > 1) {
		view.children[0].show();
	}
}

function hideActivity(view) {
	if (view.children.length > 1) {
		view.children[0].hide();
	}
}

function bindImage( view, local ) {
	var args = view._liquaniumImage,
		depth = view.children.length - 1,
		localResource = ( args.scaletofit )  
			? resizeImage( args.image, args.height, args.width )
			: getTargetFile( args.image, local );
	if ( !localResource.exists() ){
		localResource = copyImage( args.image );
	}
	Ti.API.error( localResource );
	view.children[depth].image = localResource.nativePath;
	animation.popIn(view);
}

function bindLocalImage( view ) {
	var args = view._liquaniumImage,
		depth = view.children.length - 1,
		localResource = copyImage( args.image );

	view.children[depth].image = localResource.nativePath;
	animation.popIn(view);
}



/**
 * Returns the file that would keep the cached Image.
 * @param  {Ti.Filesystem.File} cached File
 * @return {Ti.Filesystem.File}
 */
function getScaledFile( originalPath, height, width ) {
	var extension = getExtension( originalPath ),
		shaDigest = Ti.Utils.md5HexDigest( originalPath ),
		targetFilename = shaDigest  +  "." +  height + "x" + width + "."  + extension,
		targetFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, targetFilename);

	return targetFile;
}


/**
 * Returns the file that would keep the cached Image.
 * @param  {String} originalPath
 * @param  {Number} height
 * @param  {Number} width
 * @return {Ti.Filesystem.File}
 */
function getTargetFile( originalPath ) {
	var extension = getExtension( originalPath ),
		shaDigest = Ti.Utils.md5HexDigest( originalPath ),
		targetFilename = shaDigest  + "."  + extension;

	targetFile = Ti.Filesystem.getFile( Ti.Filesystem.applicationDataDirectory, targetFilename );
	return targetFile;
}

function copyImage( originalPath ) {
	var targetFile = getTargetFile( originalPath );
	if ( targetFile.exists() ){
		return targetFile;
	}
	
	var originalFile = Ti.Filesystem.getFile( Ti.Filesystem.resourcesDirectory , originalPath );

	var originalBlob = originalFile.read();
	targetFile.write( originalBlob );
	
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
function resizeImage( originalPath, height, width ) {

	var targetFile = getScaledFile( originalPath, height, width );
	
	if ( targetFile.exists() ) {
		return targetFile;
	}
	
	var targetWidth = width,
		targetHeight = height,
		originalFile = getTargetFile( originalPath );

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
	return targetFile;
};

/**
 * Created the cache store of the image
 * @param {Ti.UI.View} view
 * @param {Ti.Filesystem.File} targetFile
 * @param {Boolean} scaletofit
 */
function cacheFile( view ) {
	var args = view._liquaniumImage,
		targetFile = args.image;
		
		// create cache file system object;
		var cacheFile = getTargetFile ( targetFile );
	
	//Step 1.1: Lets see if the file is a URL;
	if ( isURL( targetFile ) ) {
		// We are going to go get it from the www
		showActivity( view );
		
		xhr.get( targetFile , function(e) {

			hideActivity(view);

			// lets try to write the original
			if ( !cacheFile.write(e.data) ) {

				// we hit some error so lets complain
				view.add(Ti.UI.createLabel({
					text : '[Liquanium] Could not write downloaded file to: ' + cacheFile.nativePath,
					color : "#000",
					left: 10,
					right: 10,
					width: Ti.UI.FILL,
					height: Ti.UI.SIZE
				}));
				Ti.API.error('[Liquanium] Could not write downloaded file to: ' + cacheFile.nativePath);
				return;

			} else {
				bindImage( view );
			}

		}, function(e) {

			hideActivity(view);

			view.add(Ti.UI.createLabel({
				text : '[Liquanium] Could not downloaded image: ' + e.error,
				color : "#000",
				left: 10,
				right: 10,
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE
			}));

			Ti.API.error('[Liquanium] Could not downloaded image: ' + e.error);

		}, {
			contentType : 'image/*'
		});

	} else {
		// This file has to be local at this point
		bindLocalImage( view );
	}
}

/**
 * Generates or loads a resized backgroundImage, respecting the original aspect
 * ratio while making sure it covers the whole view.
 * @param {Ti.UI.View} view
 * @param {String} image
 * @param {Number} targetWidth
 * @param {Number} targetHeight
 * @param {String} scaletofit
 * @param {Boolean} hasIndicator
 * @TODO: There is alot of conditionals in this function. Need to revist to break up into smaller functions and to streamline abit more
 */
exports.processImage = function( view, args ) {
	
	Ti.API.error( "Trigger event >> processImage  base args : " + JSON.stringify(  args ) );
	
	var targetFile = getTargetFile( args.image );
	
	if ( !targetFile.exists() ){
		Ti.API.error( "[Liquanium] Calling Cache Builder for >> "  + targetFile.nativePath );
		cacheFile( view );
	} else {
		Ti.API.error( "[Liquanium] File already in cache so  >> "  + targetFile.nativePath );
		bindImage( view );
	}
};
