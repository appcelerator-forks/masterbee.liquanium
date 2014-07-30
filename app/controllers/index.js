function doClick(e) {
    alert($.label.text);
}

var CachedImage = require('liquanium');


$.win.open();
/*
$.okadd.add(  CachedImage.createImageView({
	width: Ti.UI.FILL,
	top:"10dp",
	height:"150dp",
	scaletofit:"true",
	image:"http://www.zastavki.com/pictures/originals/2012/Animals_Reptiles_Nice_frog_035274_.jpg"
}));

$.okadd.add(  CachedImage.createImageView({
	width: Ti.UI.FILL,
	top:"10dp",
	height:"150dp",
	scaletofit:"true",
	image:"http://www.zastavki.com/pictures/originals/2013/Girls___Beautyful_Girls___Nice_eyes_041272_.jpg"
} ));

$.okadd.add(  CachedImage.createImageView({
	width: Ti.UI.FILL,
	top:"10dp",
	height:"150dp",
	scaletofit:"true",
	image:"http://www.bicycling.com/sites/default/files/fck_content/stg08_voeckler+breakaway01_paris-nice_2011(1).jpg"
} )); */

for(var i=0,j=10; i<j; i++){

  $.mylist.addView({
	template: 'template1',
	label: "Ok I AM NUMBER " + i,
	image: "http://static.panoramio.com/photos/large/79661170.jpg"
	});
};


