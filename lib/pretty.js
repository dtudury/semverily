exports.BLACK = 0;
exports.RED = 1;
exports.GREEN = 2;
exports.YELLOW = 3;
exports.BLUE = 4;
exports.MAGENTA = 5;
exports.CYAN = 6;
exports.WHITE = 7;

exports.log = function (str, color) {
    if(color === undefined) {
        color = 0;
    }
    console.log("\033[" + (color + 30) + "m" + str + "\033[0m");
}
