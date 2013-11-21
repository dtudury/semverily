exports.stack = [];

exports.resume = function () {
    if (exports.stack.length) {
        exports.stack.shift()();
    }
};
