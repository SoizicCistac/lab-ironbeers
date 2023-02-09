const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beersArray = await punkAPI.getBeers()
  // console.log(beersArray)
  res.render('beers', {
    beers : beersArray
  })
})

app.get('/random-beers', async (req, res) => {
  const randomBeer = await punkAPI.getRandom()
  // console.log(randomBeer)
  res.render('random-beers', {
    beer: randomBeer[0]
  })
})

app.get('/beers/beer:id', async (req, res) => {
  const beerId = await punkAPI.getBeer(req.params.id)
  console.log(beerId)
  res.render('beer', {
    beer: beerId
  })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
