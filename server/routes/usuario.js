const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _=require('underscore');
//////////////////////////////////////


app.get('/getusuario',function(req,usuarios){
  let desde = req.query.desde || 0; //logic operator, if user doesnt send "desde" propertie in the petition, then desde variable will be set in 0;
  desde = Number(desde);

  let limite = req.query.limite || 0; 
  limite = Number(limite);

  Usuario.find({})
        .skip(desde)//avoid this number or records 
        .limit(5)//show this number of records after skip n records 
        .exec((err,resMongoose)=>{
            if(err){
              return resMongoose.status(400).json({
                response:1,
                content:err
              });
            }
            if(resMongoose){
              data = {resMongoose};
            }
            usuarios.json(data);
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

app.put('/usuario/:id',function(req,res){
  let id = req.params.id;
  let body =_.pick( req.body,['nombre','email','img','role','estado']);//library underscore let me filter just the fields that i want to accept for update
  Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,usuarioDB)=>{
    if(err){
      return res.status(400).json({
        response:1,
        content:err
      });
    }
    res.json({
      response:2,
      usuario:usuarioDB
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