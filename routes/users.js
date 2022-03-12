var express = require('express');
var router = express.Router();

const userControlador = require("../controladores/usersControlador");

router.get('/',(req,res,next)=>{req.app.validarToken(req, res, next)}, userControlador.getAll);

router.get('/:id',(req,res,next)=>{req.app.validarToken(req, res, next)}, userControlador.getById);

router.post('/',(req,res,next)=>{req.app.validarToken(req, res, next)}, userControlador.crearUsuario);

router.post('/login', userControlador.login);

router.put('/:id',(req,res,next)=>{req.app.validarToken(req, res, next)}, userControlador.actualizarUsuario);

router.delete('/:id', (req,res,next)=>{req.app.validarToken(req, res, next)}, userControlador.eliminarUsuario);

module.exports = router;
