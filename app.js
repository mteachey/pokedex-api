const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

app.get('/pokemon',(req, res)=>{
    res.send('HI')
})

module.exports=app;