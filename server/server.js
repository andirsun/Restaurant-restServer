require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sqlite3 = require('sqlite3').verbose()


//////////////////////////////////////////
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
app.use( require('./routes/usuario'));






/*
mongoose.connect('mongodb://181.50.100.167:27017/test', {
    useNewUrlParser: true,
    user: 'admi',
    pass: 'rucay2019'
}).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log('error connecting to the database');
    process.exit();
});*/

mongoose.connect('mongodb://localhost:27017/resturant', (err)=>{

  if(err) throw err;
  console.log(`Base de datos mela`);
});


app.listen(process.env.PORT,()=>{
    console.log('escuchando al puerto',3000);
});