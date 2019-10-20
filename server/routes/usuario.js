const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
//////////////////////////////////////


app.get('/usuario',function(req,res){
  let id = req.params.id;
  res.json({
      id:1
  });
});

app.post('/usuario',function(req,res){
    let body = req.body;//asi leo lo que hay en el Body de la peticion post, debe usarse body parser de npm
    let usuario = new Usuario({
      nombre : body.nombre,
      email : body.email,
      password : bcrypt.hashSync(body.password,10), //ENCRIPTACION HASH DE UNA VIA CON 10 VUELTAS 
      role: body.role
    });
    
    usuario.save((err,usuarioDB)=>{
      //callback que trae error si no pudo grabar en la base de datos y usuarioDB si lo inserto
      if(err){
        return res.status(400).json({
          response:1,
          content:err
        });
      }
        //usuarioDB.password = null; //not interested in show encrypted pass in 
        res.json({
          response:2,
          content: usuarioDB
        });
      
    });    
});
//===========================================================
app.post('/postevent',function(req,res){
  res.json('Aca va a tener que enviarme la informacion del evento para crearlooooo');
});
app.put('/editevent',function(req,res){
  res.json('Aca va a tener que enviarme la informacion del evento para actualizarlo');
});
app.get('/getevent/:id',function(req,res){
  let id = req.params.id;
  res.json({
      idEvent:id
  });
});

module.exports = app;//para importar al archivo de server.js