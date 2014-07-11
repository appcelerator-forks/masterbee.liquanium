function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "info.liquanium.Image/" + s : s.substring(0, index) + "/info.liquanium.Image/" + s.substring(index + 1);
    return path;
}

module.exports = [];