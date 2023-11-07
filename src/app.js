const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forcast = require('../utils/forcast')
const current = require('../utils/current')

const app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Stevano'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'stevano'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Stevano',
        message: 'this is help page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        errMessage: 'Error 404 : Help articel is not found'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.search && !req.query.current) {
        return res.send({
            error: 'Please enter the location'
        })
    }

    else if (req.query.current){
        
        let coords = req.query.current.toString().split("%") 
        current(coords[0], coords[1], (err, currentData) => {
            if (err) {
                return res.send({error: err.code})
            }

            else{
                forcast(coords[1],coords[0], (err, fdata) => {
                    if (err) {
                        return res.send({error: err.code})
                    }

                    else{
                        res.send({
                            location: `${currentData.latitude}, ${currentData.longitude}`,
                            current: currentData,
                            forecasts: fdata
                        })
                    }
                })
            }
        })


        
    }
    
    else{ 
        geocode(req.query.search, (err, {latitude, longitude, location}) => {
            if (err) {
                return res.send({error : err.code})
            }

            current(longitude, latitude, (err, cdata) => {
                if (err) {
                    return res.send({error: err.code})
                }

            
                forcast(latitude, longitude,(err, fdata) => {
                    if (err) {
                        return res.send({error : err.code});   
                    }
        
                    res.send({
                        current: cdata,
                        location: location,
                        forecasts: fdata
                    })
                    console.log(location);
                    console.log(fdata);
                })
            })
        });
    }

    
})

app.get('*', (req, res) => {
    res.render('404page', {
        errMessage: 'Error 404 : Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('server starting');
})