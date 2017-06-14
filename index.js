let args = process.argv.slice(2);

const colors = require('colors');
const {readFile} = require('fs');
const {join} = require('path');
const {consoole, setTimeout} = require('./lib');

if (args.length < 1) {
    console.log(colors.red('You must provide the name of your script'));
    process.exit(1);
} else if (args.length > 1) {
    console.log(colors.red('We expect one and only one argument. Your script name. :)'))
    process.exit(1);
} else {
    let fullPath = join(process.cwd(), args[0]);
    readFile(fullPath, (err, buffdata) => {
        if (err) {
            console.log(colors.red(err), colors.bgRed(err.stack));
            process.exit(2);
        }
        let code = buffdata.toString();
        let lines = code.split(/[;]/g)
        .map(l => l.replace(/[\r\n]/g, ''))
        .filter(l => l.length > 0);

        //order lines by execution order
        let newlines = lines.map((l, i) => {
            if (l.charAt(0) === 'c') return {l, i};
            else if (l.charAt(0) === 's') {
                const ms = extractMilliseconds(l);
                return {
                    l: l,
                    i: ms + 10
                }
            } 
        }).sort((a, b) => {
            if (a.i > b.i) return 1
            if (a.i < b.i) return -1
            return 0
        })
        .map(o => o.l);


        //loop over the lines and
        //identify what type of instruction this is
        //console or setTimeout
        newlines.forEach((line, idx) => {
            //for the sake of brevity, we'll just check the first character
            //c = console, s = setTimeout
            if (line.charAt(0) === 'c') {
                let arg = line.slice(line.lastIndexOf('(') + 1, line.lastIndexOf(')'));
                //use our custome function to display to stdout
                consoole.log(arg);
            } else if (line.charAt(0) === 's') {
                let nbMillis = extractMilliseconds(line);
                //extract the inner console.log arguments
                let step1 = line.slice(line.indexOf('con'), line.lastIndexOf('}'));
                let arg = step1.slice(step1.lastIndexOf('(') + 1, step1.lastIndexOf(')'));
                setTimeout(() => {
                    consoole.log(arg)
                }, nbMillis)
            }
        });
    });
}

function extractMilliseconds(str) {
    //extract the milliseconds
    let stringMillis = str.slice(str.lastIndexOf(',') + 1, str.lastIndexOf(')'));
    let nbMillis = parseInt(stringMillis);
    return nbMillis;
}