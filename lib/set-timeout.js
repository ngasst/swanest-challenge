function setTimeout(cb, ms) {
    var start = new Date().getTime();

    while(new Date().getTime() < start + ms) {
        //do nothing
    }

    cb();
}

module.exports = setTimeout;