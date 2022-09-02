const path = require("path")
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../webs/views')
const partialsPath = path.join(__dirname, '../webs/partials')

//set handlebars and viewes location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setupp static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'David and Hillel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helpful text',
        title: 'Help',
        name: 'Gabbay dudes'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'Hillel and David'
    })})

// app.get('/products', (req,res) => {
    
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         }
//     }
//     res.send({
//         products: []
//     })
// })

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error})
        }
    
        forecast(latitude,  longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
    
    

app.get('/help/*', (req, res) => {
    res.render('help_not', {
        title: "Help not found",
        name: "David and hillel"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "David and hillel"
    })
})





app.listen(3000, () => {
    console.log('Yalla Hapoel Jerusalem')
})