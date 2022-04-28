const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGF0eWh1eSIsImEiOiJjbDJmanA4b3AwNTFqM2NwYXg5ZTExZnprIn0.9pb5qIHkMnDN-s0ULyywQA&limit=3`

    request({ url, json: true }, (err, response) => {
        if (err) {
            callback('Unable to connect to location services!')
        } else if (response.body.features.length === 0) {
            callback('Unable to find a location! Try another search.')
        } else {
            const firstSearch = response.body.features[0]
            const [longitude, latitude] = firstSearch.center
            callback(undefined, {
                longitude,
                latitude,
                location: firstSearch.place_name
            })
        }
    })
}

module.exports = {
    geocode
}