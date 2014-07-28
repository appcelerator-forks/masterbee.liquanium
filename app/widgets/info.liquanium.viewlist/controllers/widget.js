/*===========================================
  Liquanium viewList
  @notes: An simplified viewList widget
 ============================================*/

var IS_IOS = (Ti.Platform.name == 'android') ? false : true;
var ACTIVITY = (IS_IOS) ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK;
var TEMPLATES = {};
var args = arguments[0] || {};

/*===========================================
  Init
 ============================================*/
(function( args ){
	
	var _templates = args.children,
		_view, _id, i, j;
	
	  Ti.API.error( args );
	for ( i=0,j = _templates.length; i<j; i++){
		// Lets prep the objects templates
		var name = _templates[i].name;
		Ti.API.debug ( "found name " + name );
		delete _templates[i].name;
		TEMPLATES[name] = _templates[i];
	    Ti.API.debug( " found " + JSON.stringify( _templates[i] ) );
	};

})( args );


/*===========================================
  Methods
 ============================================*/

$.addView = function ( props ) {
	var template = props.template;
	delete props.template;
	var row = Ti.UI.createTableViewRow({
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		className: 'row' + template
	});
	
	if ( IS_IOS ) {
		row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
	}
	
	
	var item = Alloy.createController( TEMPLATES[template].controller, props  );
	row.add( item.getView() );
	$.list.appendRow( row );
	item = null;
};

$.deleteView = function ( index ) {
	
};
