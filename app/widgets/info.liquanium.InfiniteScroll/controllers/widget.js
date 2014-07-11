/*===========================================
  Liquanium Infinite Scroll Widget
  @notes: An infinite Scroll widget that is semantically set up like a listView
 ============================================*/
var args = arguments[0] || {},
    IS_IOS = (Ti.Platform.name == 'android') ? false : true,
    viewstack = [],
    hiddenscroll = 2,
    visiblescroll = 1;


delete args.id;
// some defaults
$.canvas.children[visiblescroll].children[0].layout = $.canvas.children[hiddenscroll].children[0].layout = 'vertical';
$.canvas.children[visiblescroll].children[1].backgroundColor = $.canvas.children[hiddenscroll].children[1].backgroundColor = $.canvas.children[visiblescroll].children[0].backgroundColor = $.canvas.children[hiddenscroll].children[0].backgroundColor = (args.backgroundColor) ? args.backgroundColor : "#fff";

$.canvas.applyProperties(args);

$.pullindicator.style = $.pushindicator.style = (IS_IOS) ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK;

function _sanitize(views) {
    return (_.isArray(views)) ? views : [views];
}

function _switchScrolls() {
    $.canvas.children[visiblescroll].zIndex = 4;
    $.canvas.children[hiddenscroll].zIndex = 5;
    // lets invert the indexes
    _resetCanvas();
}

function _resetCanvas(){
	 var visible = visiblescroll;
	 	 
	     visiblescroll = hiddenscroll;
	     hiddenscroll = visible;
	     
	     var back = $.canvas.children[hiddenscroll];
	     
	     back.setContentOffset({x:0, y:0}, {animate: false});
	     
	     if (back.children[0].children && back.children[0].children.length > 0) {
		    // Make a copy of the array
		    var children = back.children[0].children.slice(0);
		    var numChildren = children.length;
		    for( i = 0; i < numChildren; i++) {
		       back.children[0].remove(children[i]);
		    }
		 }
}

function _switchScrollsAnimated() {
        // first lets get the height of visible;
        var newHeight = $.canvas.children[hiddenscroll].children[0].getRect().height - $.canvas.children[visiblescroll].children[0].getRect().height;
        	
	        //alert( $.canvas.children[hiddenscroll].children[0].getRect().height  );
	        $.canvas.children[visiblescroll].setContentOffset({x:0, y: newHeight}, {animate: true});
			
			$.canvas.children[visiblescroll].zIndex = 4;
	        $.canvas.children[hiddenscroll].zIndex = 5;
		    
		   _resetCanvas();
    }
    // Functions

function addToScroll(views) {
    var _views = _sanitize(views);
    for (var i = 0, j = _views.length; i < j; i++) {
        $.canvas.children[ visiblescroll ].children[0].add( _views[i] );
    };
    return true;
}

function add(views) {
        return addToScroll(views);
    }
    // this is really just a wrapper method since we can always add natively to a scrollview;

function append(views) {
    addToScroll(views);
}

function prepend(views) {
        if ($.canvas.children[visiblescroll].children[0].children < 1) {
            addToScroll(views);
        }
        // ensure we are talking only in arrays
        views = _sanitize(views);
        var workerscroller = $.canvas.children[hiddenscroll].children[0],
            _arrayofviews = $.canvas.children[visiblescroll].children[0].children.slice(0),
            _complete = views.concat(_arrayofviews);
        for (var i = 0, j = _complete.length; i < j; i++) {
            Ti.API.debug("adding > " + _complete[i].apiName);
            workerscroller.add(_complete[i]);
        };
        //workerscroller.views = _complete;
        if (false) {
            // ok lets get even funkier :)
            _switchScrollsAnimated();
        } else {
            _switchScrolls();
        }
        // ok lets have some fun
        //alert( "complete" );
        return true;
    }
    // Binding methods
exports.add = add;
exports.prepend = prepend;
exports.append = append;
$.pullindicator.show();
$.pushindicator.show();