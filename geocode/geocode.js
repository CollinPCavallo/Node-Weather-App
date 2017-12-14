//requires the request npm package to allow http request to pull from googles server
const request = require('request');

//geocodeAddress function that takes in an adress and a call back function.
var geocodeAddress = (address, callback) => {
    //encodes the address given to be put into the url for our http request.
    var encodedURL = encodeURIComponent(address)

    // creates the request from the google server using the encoded address given by user, returning it as a json object.
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}`,
        json: true
    }, (error, response, body) => {
        //if an error is received we inform the user that the application could not connect to the google servers.
        if (error) {
            callback('Unable to connect to Google Servers.');
        // if no results come back from the results of the json object, we inform the user that no results were found.
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find entered address')
        //if no errors occurred, we then place the results we want inside a object to be returned.
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng

            })
        }
    });
}
module.exports.geocodeAddress = geocodeAddress;