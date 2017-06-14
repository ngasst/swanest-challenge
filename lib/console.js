const {EOL} = require('os');
function log(element) {
    process.stdout.write(element);
    //add line break to emulate the way console.log works
    process.stdout.write(EOL);
}

module.exports = {
    log: log
}