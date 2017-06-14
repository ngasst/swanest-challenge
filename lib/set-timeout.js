function setTimeout(cb, ms) {
    var start = new Date().getMilliseconds();
    var now = new Date().getMilliseconds();

    while(start < now) {
        now = new Date().getMilliseconds();
    }

    if (now >= start) {
        cb();
    }
}

module.exports = setTimeout;