const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2e8abbcaffcee36890bb5b1ddd206c99&query=' + latitude +  ',' + longitude +'&units=m'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
            body.current.weather_descriptions[0] + ". It is currently " + 
            body.current.temperature + " degress out." + " And it feels like " + body.current.feelslike + 
            " degrees. And the humidity is " + body.current.humidity + "%.")
        }
    })
}

module.exports = forecast