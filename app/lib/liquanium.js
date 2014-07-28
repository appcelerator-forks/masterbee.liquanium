/*===========================================
 Liquanium Core Helper module file
 @notes:
 ============================================*/
var IMAGE = require('liquidresources/image');
var ACTIVITYCOLOR = (Ti.Platform.name === 'iPhone OS') ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK;



function _getExtension(fn) {
	// from http://stackoverflow.com/a/680982/292947
	var re = /(?:\.([^.]+))?$/;
	var tmpext = re.exec(fn)[1];
	return (tmpext) ? tmpext : '';
};


function _getLaid( e) {
	var element = e.source;
	element.removeEventListener( "postlayout", _getLaid );
	e.source._isPostLayed = true;
}


/**
 * Check is a dimension is absolute.
 * @param  {mixed} Dimension
 */
function _isAbsolute(dimension) {
	return dimension && dimension.toString().match(/^[1-9]+[0-9]*[a-z]*$/);
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
 * Module name: ImageView
 * returns:  Return a cachedriven ImageView
 */
exports.createImageView = function(args) {
	// first lets remove the image since we are using it at as backgroundImage of a view;
	var image = args.image;
	var behaviour = args.scaletofit;
	
	delete args.image;

	// Lets stage the context
	var view = Ti.UI.createView( args );
	
	view.addEventListener( "postlayout", _getLaid );
	
	if ( image ) {
		IMAGE.setImage(view, image, args.width, args.height, behaviour);
	}
	
	// Public Methods for accessing Module
	view.addEventListener("setimage", function(e){
		Ti.API.info( JSON.stringify( e) ); // this is interesting since having the console.log out actually makes the function perform as it should.
		
		// lets ensure we are using the calling source to prevent memory leaks
		IMAGE.setImage(e.source, e.image, e.source.width, e.source.height, e.source.scaletofit);
		
	});
	
	return view;
};
