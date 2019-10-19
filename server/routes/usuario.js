const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
//////////////////////////////////////
app.get('/authenticate',function(req,res){
  let body = req.body;//Body request
  if(body.id==undefined){
    req.status(400).json({
      ok:false,
      response:1,
      content:'User Id is require for petition'
    });
  }else{
    ///I need to put the query of autentication here
    db.serialize(function(){ 
      db.each("SELECT id FROM users", function(err, row) {
          console.log("User id : "+row.id);
      });
    });
    res.json({
      user:id
    });
  }
});

app.get('/usuario',function(req,res){
  let id = req.params.id;
  res.json({
      id:1
  });
});

app.post('/usuario',function(req,res){
    let body = req.body;//asi leo lo que hay en el vody de la peticion post, debe usarse body parser de npm
    let usuario = new Usuario({
      nombre : body.nombre,
      email : body.email,
      password : body.password,
      role: body.role
    });
    
    usuario.save((err,usuarioDB)=>{
      //callback que trae error si no pudo grabar en la base de datos y usuarioDB si lo inserto
      if(err){
        return response.status(400).json({
          ok:false,
          err
        });
      }
        res.json({
          ok:true,
          usuario: usuarioDB
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