function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "info.liquanium.Image/" + s : s.substring(0, index) + "/info.liquanium.Image/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [];