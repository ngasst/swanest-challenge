function setTimeout(cb, ms) {
    var start = new Date().getTime();
    
    //var now = new Date().getMilliseconds();

    while(new Date().getTime() < start + ms) {
        //do nothing
    }

    cb();
}

module.exports = setTimeout;