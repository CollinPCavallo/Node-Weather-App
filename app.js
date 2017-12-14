// requires the "Yargs" npm package
const yargs = require('yargs');

"requires the geocode file to allow us to call the geocodeAddress function"
const geocode = require('./geocode/geocode.js')

// sets up user input using yargs, adding the -a flag for the address the user would like to search
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

//call the geocodeAddress function from within geocode.js, after the results from the function come back, we check if there is an error message,
//if so we console log the message, if not then we console.log the returning object.
geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2))
    }
})