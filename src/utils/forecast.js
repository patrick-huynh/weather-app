const request = require('request')

const forecast = (coordinates, callback) => {
    const [longitude, latitude] = coordinates
    const url = `http://api.weatherstack.com/current?access_key=0b5deb94fff112d218d6b8b844f3a324&query=${latitude},${longitude}`

    request({ url, json: true}, (err, response) => {
        if (err) {
            callback('Unable to connect to weather service!')
        } else if (response.body.error) {
            callback('Unable to find location!')
        } else {
            const { weather_descriptions, temperature, feelslike } = response.body.current
            const forecast = `${weather_descriptions}. It is currently ${temperature} degrees out and feels like ${feelslike}`
            callback(undefined, forecast)
        }
    })
}

module.exports = {
    forecast
}