const request = require('request')

const geocoding = (addr, callback) => {
    const geourl = `https://geocoding-api.open-meteo.com/v1/search?name=${addr}&count=10&language=en&format=json`;


    request({url: geourl, json: true}, (err, {body})=>{
        if(!body){
            callback(err.code, undefined);
        }

        else if(!body.results){
            callback('Try another city', undefined);
        }

        else{
            callback(undefined, {
                latitude: body.results[0].latitude,
                longitude: body.results[0].longitude,
                location: [body.results[0].name,
                            body.results[0].admin1,
                            body.results[0].country]
                
            });
            // callback(undefined, body);
        }
    });
};

module.exports = geocoding;
