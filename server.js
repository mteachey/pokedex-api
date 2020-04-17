require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const POKEDEX = require('./pokedex.json');
const cors = require('cors');

const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());


app.use(function validateBearerToken(req,res, next){
  //split splits the string into two array elements ['Bearer', 'token'], then we want second element or element index [1]
  //const bearerToken = req.get('Authorization');
  const authToken = req.get('Authorization')
  const apiToken = process.env.API_TOKEN ;

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
    }
  
  //move to the next middleware
  next()
})

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

function handleGetTypes(req, res) {
    res.json(validTypes)
}
    
app.get('/types', handleGetTypes);

function handleGetPokemon(req, res) {

    const {name, type}=req.query;
  
    let results = POKEDEX.pokemon;
    
    if(type){
        if(!validTypes.includes(type)){
            return res.status(400).send('Type must be a valid type')
        }
      results=results.filter(pokeman=>
          pokeman.type.includes(type));
    }

    if(name){
    results = results.filter(pokeman=>
        pokeman.name.toLowerCase().includes(name.toLowerCase()));}

    res.json(results)
}
    
app.get('/pokemon', handleGetPokemon)

app.use((error, req, res, next) => {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})
    
const PORT = process.env.PORT || 8000

  app.listen(PORT, () => {
   
  })