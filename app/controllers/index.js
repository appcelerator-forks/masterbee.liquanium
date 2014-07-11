function doClick(e) {
    alert($.label.text);
}

var new1 = Ti.UI.createView({
	width: Ti.UI.FILL,
	height: 30,
	backgroundColor: "red"
});

var new2 = Ti.UI.createView({
	width: Ti.UI.FILL,
	height: 30,
	backgroundColor: "blue"
});

var new3 = Ti.UI.createView({
	width: Ti.UI.FILL,
	height: 30,
	backgroundColor: "pink"
});

_.each([ new1, new2, new3 ], function(elem){
	elem.addEventListener('click', function(e){
		alert('you clicked me');
	});
});


$.scroll.add( new1 );

setTimeout( function(w){ $.scroll.add( new2 ); }, 5000);

setTimeout( function(w){ $.scroll.prepend( new3 ); }, 10000);

$.win.open();
