const {EOL} = require('os');
function log(element) {
    process.stdout.write(element);
    process.stdout.write(EOL);
}

module.exports = {
    log: log
}