/*===========================================
  Liquanium Infinite Scroll Widget
  @notes: An infinite Scroll widget that is semantically set up like a listView
 ============================================*/
var args = arguments[0] || {},
    IS_IOS = (Ti.Platform.name == 'android') ? false : true,
    viewstack = [],
    hiddenscroll = 2,
    visiblescroll = 1,
    visible, hidden;

delete args.id;

// Lets init
(function (args, $) {
    visible = $.canvas.children[visiblescroll],
        hidden = $.canvas.children[hiddenscroll];
    visible._contentHeight = hidden._contentHeight = 0;
    visible.addEventListener("changed", _changed);
    hidden.addEventListener("changed", _changed);
    $.pullindicator.style = $.pushindicator.style = (IS_IOS) ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK;
    $.canvas.applyProperties(args);
    $.pullindicator.show();
	$.pushindicator.show();
})(args, $);

function _getTrueHeight(e) {
    var _element = e.source,
        parentNode = _element.getParent();
    _element.removeEventListener("postlayout", _getTrueHeight);
    parentNode._queue -= 1;
    
    Ti.API.debug(parentNode._queue);
    
    parentNode._contentHeight += e.source.size.height;
    parentNode.fireEvent("changed", {});
};

function _changed(e) {
    var node = e.source;
    if (node._queue < 1) {
        node.fireEvent("completed", {});
        node._queue = 0;
    }
}

function _completed(e){
	var node = e.source;
	
	node.removeEventListener("completed", _completed);
	
	Ti.API.debug("===============================" );
	Ti.API.debug(" HIDDEN HEIGHT " + hidden._contentHeight );
	Ti.API.debug(" VISIBLE HEIGHT " + visible._contentHeight );
	Ti.API.debug("===============================" );
	
	if (true){
		// lets animate the difference
		var diff = hidden._contentHeight - visible._contentHeight;
		//alert( diff );
		//visible., {animated:true});
		//_switchScrolls();
	}else{
		_switchScrolls();
	}
}




function _sanitize(views) {
    return (_.isArray(views)) ? views : [views];
}

function _switchScrolls() {
    visible.zIndex -= 1;
    hidden.zIndex += 1;
    // lets invert the indexes
    _resetCanvas();
}

function _resetCanvas() {
    var visibleIndex = visiblescroll;
    visiblescroll = hiddenscroll;
    hiddenscroll = visibleIndex;

    // -- Reset Pointers -- //
    visible = $.canvas.children[visiblescroll];
    hidden = $.canvas.children[hiddenscroll];
    
    // Lets zero Out our lists
}

function _switchScrollsAnimated() {
        // first lets get the height of visible;
        //var newHeight = $.canvas.children[hiddenscroll].children[0].getRect().height - $.canvas.children[visiblescroll].children[0].getRect().height;
        //alert( $.canvas.children[hiddenscroll].children[0].getRect().height  );
        //$.canvas.children[visiblescroll].children[0].animate( { top:100, duration:500}, function(){
        //});
        //$.canvas.children[visiblescroll].children[0].top=100;
        //$.canvas.children[visiblescroll].setContentOffset({x:0, y: newHeight}, {animate: true});
        //$.canvas.children[visiblescroll].children[0].animate({ top: 100, duration: 1000}, function(){
        //$.canvas.children[visiblescroll].zIndex = 4;
        //$.canvas.children[hiddenscroll].zIndex = 5;
        //});
        //_resetCanvas();
    }
    // Functions

function addToScroll(views) {
    var _views = _sanitize(views),
        _viewport = $.canvas.children[visiblescroll];
    visible._queue = _views.length;
    for (var i = 0, j = _views.length; i < j; i++) {
        _views[i].addEventListener("postlayout", _getTrueHeight);
        _viewport.add(_views[i]);
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
        if (visible.getChildren().length < 1) {
            addToScroll(views);
        }
        // ensure we are talking only in arrays
        views = _sanitize(views);
        var _arrayofviews = visible.getChildren(),
            _complete = views.concat(_arrayofviews);
        // 
        hidden._queue = _complete.length;
        for (var i = 0, j = _complete.length; i < j; i++) {
            Ti.API.debug("adding > " + _complete[i].apiName);
            _complete[i].addEventListener("postlayout", _getTrueHeight);
            hidden.add(_complete[i]);
        };
        hidden.addEventListener("completed", _completed);
        return true;
    }
    // Binding methods
exports.add = add;
exports.prepend = prepend;
exports.append = append;
