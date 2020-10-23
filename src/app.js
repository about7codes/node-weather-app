// Finished Vid 9.6

const path = require('path');
const exress = require('express');
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = exress();
const port = process.env.PORT || 3000;
console.log(port)

// Defined path for express congig
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(exress.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Jack Jones'
    });
})

app.get('/about', ( req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Mashone Jos'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg : 'This is A Message !',
        title: 'Help page',
        name: 'Jakes'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Invalid address, Try again.'
        })
    }

    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if (err) {
          return res.send({ error : err});
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({error : error});
          }

          res.send({
            forcast: forecastData,
            location: location,
            address: req.query.address
        })
    
        //   console.log(location);
        //   console.log(forecastData);
        });
      });

    // res.send({
    //     forcast: '50 deg',
    //     location: 'London',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Help 404',
        name: 'Jakes',
        msg: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Jakes',
        msg: 'Page not found'
    })
})


app.listen(port, ()=> {
    console.log('Server is up at port ' + port)
});