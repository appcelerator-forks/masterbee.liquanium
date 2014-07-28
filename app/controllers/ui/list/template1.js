var args = arguments[0] || {};


var image =  args.image;
var label =  args.label;
if ( label ) {
	$.label.text = label;
}

if ( image ) {
	Ti.API.debug ( "setting image to : " + image );
	$.check.fireEvent("setimage", { image: image });
}

$.check.addEventListener('click', function(e){
	alert( "ok you clicked me!");
});
