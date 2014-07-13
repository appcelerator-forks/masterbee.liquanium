function doClick(e) {
    alert($.label.text);
}

//var new1 = Ti.UI.createView({
//	width: Ti.UI.FILL,
//	height: 30,
//	backgroundColor: "red"
//});

//var new2 = Ti.UI.createView({
//	width: Ti.UI.FILL,
//	height: 30,
//	backgroundColor: "blue"
//});




//$.scroll.add( new1 );

//setTimeout( function(w){ $.scroll.add( new2 ); }, 5000);

//setTimeout( function(w){ $.scroll.prepend( new3 ); }, 10000);

$.win.open();

$.scroll.append({
	bgcolor: 'pink',
	template: 'view1'
});
