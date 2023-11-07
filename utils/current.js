const { json } = require('express');
const baseModule = require('hbs');
const request = require('request')

const current = (longitude, latitude, callback) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m,weather_code`

    request({url: url, json: true}, (err, {body}) => {
        if (err) {
            callback('error', undefined);
        }

        else if(body.error){
            callback('Cannot find the location please try again', undefined)
        }

        else{
            callback(undefined, {
                temp: body.current.temperature_2m,
                humy: body.current.relative_humidity_2m,
                wind: body.current.wind_speed_10m,
                rain: body.current.rain,
                code: body.current.weather_code,
                latitude: body.latitude,
                longitude: body.longitude
            })
        }
    })  
}

module.exports = current;