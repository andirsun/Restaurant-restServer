require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.get('/usuario',function(req,res){
    res.json('get usuario');

});
app.post('/usuario',function(req,res){
    let body = req.body;//asi leo lo que hay en el vody de la peticion post, debe usarse body parser de npm

    if(body.nombre === undefined){ //asi respondo si las peticiones son buenas o malas
        res.status(400).json({
            ok:false,
            mensaje:'EL nombre es necesario'
        });
    }else{
        res.json({
            persona:body
        });
    }
    

});
app.put('/usuario/:id',function(req,res){
    let id = req.params.id;
    res.json({
        id
    });

});


app.listen(process.env.PORT,()=>{
    console.log('escuchando al puerto',3000);
});