/*===========================================
 Liquanium Core Helper module file
 @notes:
 ============================================*/
var IMAGEUTIL = require('liquidresources/image');
var ACTIVITYCOLOR = (Ti.Platform.name === 'iPhone OS') ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK;

function firstToLowerCase( str ) {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}

function _getExtension(fn) {
	// from http://stackoverflow.com/a/680982/292947
	var re = /(?:\.([^.]+))?$/;
	var tmpext = re.exec(fn)[1];
	return (tmpext) ? tmpext : '';
};

function processImage(e) {

	var element = e.source, args = element._liquaniumImage;

	// Lets make sure we are not trying to set an image
	if (e.image) {
		args.image = element._liquaniumImage.image = e.image;
	}

	if (e.type === 'postlayout') {
		element.removeEventListener("postlayout", processImage);
		// set a flag for the other process
		args.width = element._liquaniumImage.width = element.size.width;
		args.height = element._liquaniumImage.height = element.size.height;

		args._isLayedOut = element._liquaniumImage._isLayedOut = true;
	}

	Ti.API.error("testing on > " + e.type + " [properties] : hasLayout: " + args._isLayedOut + " containsImage: " + (args.image ));

	element._liquaniumImage = args;

	if (args._isLayedOut && args.image) {

		return IMAGEUTIL.processImage(element, args);
	}

}

/* Module name: ViewTemplate
 * returns: An object of parameters that are compliled by Alloy
 */
exports.createViewTemplate = function(args) {
	return args;
};

/**
 *  Module name: ButtonTemplate
 * returns: An object of parameters that are compliled by Alloy
 */
exports.createButtonTemplate = function(args) {
	return args;
};

/**
 *  Module name: ButtonTemplate
 * returns: An object of parameters that are compliled by Alloy
 */
exports.createToolbar = function(args) {
	Ti.API.debug(args.children);
};


/**
 *  Module name: a Template to create a masked image
 * returns: An object of parameters that are compliled by Alloy
 */
exports.createMaskedImageView = function(args) {
	// Lets stage the context
	var bImage = args.backgroundImage,
		fImage = args.foregroundImage;
	
	Ti.API.error( args );
	delete args.backgroundImage;
	delete args.foregroundImage;
	
	var viewport = Ti.UI.createView(args);
	
	var background = createImage({
		image: bImage,
		top: 0,
		backgroundColor: 'transparent',
		left: 0,
		zIndex: 2,
		preventDefaultImage : true
	});
	
	// Settings for the backgroundImage ( since most of the time users will want to customize under a mask )
	_.each( args, function(property, key){
		if ( key.indexOf('background') !== -1 ) {
			var _property = firstToLowerCase ( key.replace("background", "") ) ;
			background[_property] = property;
		}
	});
	
	var foreground = createImage({
		image: fImage,
		top: 0,
		backgroundColor: 'transparent',
		left: 0,
		zIndex: 5,
		preventDefaultImage : true
	});

	viewport.add( background );
	viewport.add( foreground );
	
	return viewport;
};

/**
 * Module name: createImage
 * returns:  Return a cachedriven ImageView
 */
function createImage(args) {
	// first lets remove the image since we are using it at as backgroundImage of a view;
	var image = {
		image : args.image,
		width : args.width,
		height : args.height,
		scaletofit : args.scaletofit
	}, hasImage = args.image;
	//var behaviour = args.scaletofit;

	delete args.image;
	delete args.id;

	// Lets stage the context
	var imageView = Ti.UI.createImageView({
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		zIndex : 3,
		preventDefaultImage : true
	});

	var viewport = Ti.UI.createView(args);

	// Lets add the spinner
	if ( typeof args.noindicator === "undefined") {

		viewport.add(Ti.UI.createActivityIndicator({
			style : ACTIVITYCOLOR,
			message : '',
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			zIndex : 2
		}));
		// Lets add the indicator is there
		image.hasIndicator = true;
	}

	viewport._liquaniumImage = image;
	viewport.add(imageView);

	viewport.addEventListener('setimage', processImage);
	viewport.addEventListener('postlayout', processImage);

	// call the image utils if there is one set
	return viewport;
};

exports.createImageView = createImage;
