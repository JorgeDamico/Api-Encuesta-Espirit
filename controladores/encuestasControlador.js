const encuestasModel = require("../modelos/encuestasModelo")

module.exports={
    getAll:async function(req, res, next) { 
      console.log(req.query);
        try{
          let queryFind = {}
          if(req.query.buscar){
            queryFind = {nombre:{$regex:".*"+req.query.buscar+".*",$options:"i"}}
          }
          const documentos = await encuestasModel.find(queryFind)
          res.status(200).json(documentos);
        }catch(e){
          console.log(e);
          next(e)
        } 
      },
      
    getById:async function(req, res, next) {
        console.log(req.params, req.params.id);
        try{
          const documentos = await encuestasModel.findById(req.params.id)
          res.status(200).json(documentos);
        }catch(e){
          console.log(e);
          next(e)
        }
      },

    crearEncuesta:async function(req, res, next) {
      try{
          const encuesta = new encuestasModel({
            nombre:req.body.nombre,
            nacimiento:req.body.nacimiento,
            genero:req.body.genero,
            provincia:req.body.provincia,
            valoracion:req.body.valoracion, 
            recomendacion:req.body.recomendacion,
            comentario:req.body.comentario
          })
          const documento = await encuesta.save()
          res.status(201).json(documento)
      } catch (e){
          console.log(e)
          next(e)
      } 
    },

    actualizarEncuesta:async function(req, res, next) {
        try{
          console.log(req.params.id, req.body);
          const update = await encuestasModel.updateOne({_id:req.params.id}, req.body)
          res.json(update);
        } catch (e){
          console.log(e) 
          next(e)
        }
      },
       
    eliminarEncuesta:async function(req, res, next) {
        try{
          console.log(req.params.id);
          const deleted = await encuestasModel.deleteOne({_id:req.params.id})
          res.json(deleted);
        } catch (e){
          console.log(e) 
          next(e)
        }
      }  

}