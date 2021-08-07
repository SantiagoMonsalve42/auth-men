
const { Router }= require('express');
const { check } = require('express-validator');

const { crearUsuarios, loginUsuario, refreshJWT } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router= Router();

//create new user
router.post('/new', [
    check("name","El nombre es obligatorio").not().isEmpty().isLength({min: 4}),
    check("email","El email es obligatorio").isEmail(),
    check("password","La contraseña es obligatoria").isLength({min: 6}),
    validarCampos
],crearUsuarios);

//login user
router.post('/',[
    check("email","El email es obligatorio").isEmail(),
    check("password","La contraseña es obligatoria").isLength({min: 6}),
    validarCampos
], loginUsuario);

//validate and refresh JWT
router.get('/',[
    validarJWT
],refreshJWT);




module.exports=router;