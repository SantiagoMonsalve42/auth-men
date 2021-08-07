const{response,request}= require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarJwt} = require('../helpers/jwt');

const crearUsuarios= async(req= request,res= response) =>{
    
    const {name,email,password}=req.body;
    try{
        // verify email
        const usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({
                ok: false,
                mgs: "El correo ya existe en la bd"
            });
        }
        //encrypt pass
        const usuarioDB = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuarioDB.password = bcrypt.hashSync( password ,salt);
        //create JWT for clients
        const token = await generarJwt(usuarioDB.id,name);
        //create user in DB
        await usuarioDB.save();
        //generate ok response 
        return res.status(201).json({
            ok: true,
            uid: usuarioDB.id,
            name,
            token
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            mgs: "error interno del servidor"
        });
    }
    
}

const loginUsuario= async(req= request,res= response) =>{
    
    const {email,password}=req.body;
    try{
        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({
                ok: false,
                mgs: "error de credenciales"
            });
        }
        
        //Confirmar password
        const validPassword = bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                mgs: "error de credenciales"
            });
        }
        const token = await generarJwt(usuario.id,usuario.name);

        return res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
            });
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            mgs: "error interno del servidor"
        });
    }

}

const refreshJWT= async(req= request,res= response) =>{
    const{uid,name} = req;
    const token = await generarJwt(uid,name);
    return res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    crearUsuarios,
    loginUsuario,
    refreshJWT
}