const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.get('/pokemon',(req, res)=>{
    res.send('HI')
})

module.exports=app;