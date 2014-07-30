var args = arguments[0] || {};


var image =  args.image;


if ( image ) {
	Ti.API.debug ( "setting image to : " + image );
	$.check.fireEvent("setimage", { image: image });
}

