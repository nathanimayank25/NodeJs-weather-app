const hbs = require('hbs') 
const express = require('express')
const path = require('path')
const geocode = require('./utls/geocode')
const forecast = require('./utls/forecast')
const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
app.set('view engine', 'hbs')
//to customize the server to serve up the folder (of HTML file)
// to serve the directory up.
app.use(express.static(path.join(__dirname, '../public')))

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mayank Nathani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'Mayank Nathani'
    })
})

app.get('/weather', (req, res)=>{

    if (!req.query.address){
        return res.send({
            error: 'Put in some location to fetch the weather'
        })
    }


    geocode(req.query.address, (error,{latitude, longitude, location}={})=>{

        if (error){
            //return console.log(error)
            return res.send({
                //error: error
                error    
            })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                //return console.log(error)
                return res.send({
                    error: error
                })
            }
            //console.log(locationData)
            //console.log(forecastData)
            res.send({
                location: location,
                temperature: forecastData.temperature,
                latitude: latitude,
                longitude: longitude,
                address: req.query.address
            })

        })
    })

})

app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'Put in some search'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Learning Node is fun!',
        name: 'Mayank Nathani'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Error Page',
        error_msg: 'My help page not found',
        name: 'Mayank Nathani'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        error_msg: 'My 404 page'
    })
})

app.listen(port, () => {
    console.log('the server is up on port ' + port)
})
