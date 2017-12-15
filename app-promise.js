const yargs = require('yargs');
const axios = require('axios');


"requires the geocode file to allow us to call the geocodeAddress function"


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

var encodedURL = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?key =AIzaSyCu7515EeuSZGkE2Vy1j0jdSSiTzQKzZn8&&address=${encodedURL}`;

axios.get(geocodeURL).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address')
    }

    var lat = response.data.results[0].geometry.location.lat
    var lng = response.data.results[0].geometry.location.lng
    var weatherURL = `https://api.darksky.net/forecast/8a40f776ab3875997798185962f99c37/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((response) => {
    var temperature = response.data.currently.temperature
    var apparentTemperature = response.data.currently.apparentTemperature
    console.log(`Its currently ${temperature}. It feels like ${apparentTemperature}.`)
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers')
    } else {
        console.log(e.message);
    }
})