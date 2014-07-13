/*===========================================
  Liquanium Listview
  @notes: An simplified Listview widget
 ============================================*/

var args = arguments[0] || {},
	templates = args.children,
    IS_IOS = (Ti.Platform.name == 'android') ? false : true,
    activityType = (IS_IOS) ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK;
    

/*===========================================
  Init
 ============================================*/
(function (args, $) {
	delete args.id;
	// lets inherit all the properties in Alloy for this view
	$.canvas.applyProperties(args);
	
	// lets set the templates for the list
	Ti.API.debug( JSON.stringify(templates ) );
	
	//$.list.templates = templates;
	// Lets set the indicator style
	_.each([$.pullindicator, $.pushindicator], function(obj){
		obj.style = activityType;
		obj.show();
	});

	Ti.API.debug( JSON.stringify( $.list ) );
	// some IOS magic
	if ( IS_IOS ){
		// We want to reset all the list to basically allow for complete white canvas for developers
		$.list.applyProperties({
			seperatorStyle : Ti.UI.iPhone.ListViewSeparatorStyle.NONE,
			separatorInsets: { left: 0, right: 0 }
		});
	}else{
		// Some defaults to Andriod
		$.list.applyProperties({
			softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS
		});
	}
	
})(args, $);

function append( props ) {
	var section = Ti.UI.createListSection();
	//section.appendItems( props );
	//$.list.appendSection( section );
}
exports.append = append;
