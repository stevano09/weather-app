const { json } = require('express');
const request = require('request');

const forcast = (latitude, longitude, callback) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max&past_days=1`;

    request({url: url, json: true}, (err, {body}) => {
        if (err) {
            callback(err.code, undefined);
        }
        
        else if(body.error){
            callback('Cannot find the location please try again', undefined);
        }

        else{
            callback(undefined, {
                time: body.daily.time,
                temp_min: body.daily.temperature_2m_min,
                temp_max: body.daily.temperature_2m_max,
                weather_code: body.daily.weather_code,
                rain: body.daily.rain_sum,
                wind: body.daily.wind_speed_10m_max
            });
                
            
        }
    });
};


module.exports = forcast;