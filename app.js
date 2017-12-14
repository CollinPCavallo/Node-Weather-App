const request = require('request');
const yargs = require('yargs');

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


    var encodedURL = encodeURIComponent(argv.a)
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to Google Servers.');
    } else if (body.status === 'ZERO_RESULTS'){
        console.log('Unable to find entered address');
    }else if(body.status === 'OK') {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
}
})