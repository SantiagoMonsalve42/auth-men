
const { Router }= require('express');
const { check } = require('express-validator');

const { crearUsuarios, loginUsuario, refreshJWT } = require('../controllers/auth');

const router= Router();

//create new user
router.post('/new', [
    check("name","El nombre es obligatorio").isLength({min: 4}),
    check("email","El email es obligatorio").isEmail(),
    check("password","La contraseña es obligatoria").isLength({min: 6}),
],crearUsuarios);

//login user
router.post('/',[
    check("email","El email es obligatorio").isEmail(),
    check("password","La contraseña es obligatoria").isLength({min: 6}),
], loginUsuario);

//validate and refresh JWT
router.get('/',refreshJWT);




module.exports=router;