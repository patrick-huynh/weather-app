const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Patrick Huynh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Patrick Huynh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'You need help',
        name: 'Patrick Huynh'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    
    // Retrieve forecast data
    geocode(address, (err, { longitude, latitude, location } = {}) => {
        if (err) {
            return res.send({ error: err })
        }
        forecast([longitude, latitude], (err, forecastData) => {
            if (err) {
                return res.send({ error: err })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'ERROR 404',
        message: 'Help article not found.',
        name: 'Patrick Huynh'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'ERROR 404',
        message: 'Page not found.',
        name: 'Patrick Huynh'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})