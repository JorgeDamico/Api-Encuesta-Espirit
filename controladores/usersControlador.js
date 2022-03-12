const usersModel = require("../modelos/usersModelo")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports={
  getAll:async function(req, res, next) {
    try{
     console.log(req.query);
     const documentos = await usersModel.find();
     res.json(documentos);
    }catch (e){
     console.log(e);
     next(e)
    }
   },
      
    getById:async function(req, res, next) {
        console.log(req.params, req.params.id);
        try{
          const documentos = await usersModel.findById(req.params.id)
          res.status(200).json(documentos);
        }catch(e){
          console.log(e);
          next(e)
        }
      },
      login:async function(req, res, next) {
        try{
         const user = await usersModel.findOne({email:req.body.email});
         if(!user){
          res.json({error:true, message:"Email incorrecto"})
          return
         }
         if(bcrypt.compareSync(req.body.password, user.password)){
          const token = jwt.sign({userId:user._id}, req.app.get("secretKey"),{expiresIn:"1h"})
          return res.json({error:false, token})
         }else{
          res.json({error:true, message:"Contraseña incorrecta"})
          return
         }
         res.json(documentos);
        }catch (e){
         console.log(e);
         next(e)
        }
       },

    crearUsuario:async function(req, res, next) {
      try{
          const usuario = new usersModel({
            user:req.body.user,
            email:req.body.email,
            password:req.body.password
          })
          const documento = await usuario.save()
          res.status(201).json(documento)
      } catch (e){
          console.log(e)
          next(e)
      } 
    },

    actualizarUsuario:async function(req, res, next) {
        try{
          console.log(req.params.id, req.body);
          const update = await usersModel.updateOne({_id:req.params.id}, req.body)
          res.json(update);
        } catch (e){
          console.log(e) 
          next(e)
        }
      },
       
    eliminarUsuario:async function(req, res, next) {
        try{
          console.log(req.params.id);
          const deleted = await usersModel.deleteOne({_id:req.params.id})
          res.json(deleted);
        } catch (e){
          console.log(e) 
          next(e)
        }
      }  

}