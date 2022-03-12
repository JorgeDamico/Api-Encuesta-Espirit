var express = require('express');
var router = express.Router();

const encuestasControlador = require("../controladores/encuestasControlador");

router.get('/',(req,res,next)=>{req.app.validarToken(req, res, next)}, encuestasControlador.getAll);

router.get('/:id',(req,res,next)=>{req.app.validarToken(req, res, next)}, encuestasControlador.getById);

router.post('/', encuestasControlador.crearEncuesta);

router.put('/',(req,res,next)=>{req.app.validarToken(req, res, next)}, encuestasControlador.actualizarEncuesta);

router.delete('/',(req,res,next)=>{req.app.validarToken(req, res, next)}, encuestasControlador.eliminarEncuesta);

module.exports = router;
