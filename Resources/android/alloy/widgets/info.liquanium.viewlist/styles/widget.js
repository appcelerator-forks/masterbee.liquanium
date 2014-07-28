function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "info.liquanium.viewlist/" + s : s.substring(0, index) + "/info.liquanium.viewlist/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0002,
    key: "Table",
    style: {
        backgroundColor: "transparent",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    }
} ];