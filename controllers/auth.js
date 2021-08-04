const{response,request}= require('express');
const { validationResult } = require('express-validator');


const crearUsuarios=(req= request,res= response) =>{
    
    const errors=validationResult(req);
    if(! errors.isEmpty() ){
        return res.status(400).json({
            ok : false,
            msg: errors.mapped()
        })
    }else{
        const {name,email,password}=req.body;
        console.log(name,email,password);
        return res.json({
        ok: true,
        mgs: "vientos /new"
    });
    }
}

const loginUsuario=(req= request,res= response) =>{
    
    const errors=validationResult(req);
    if(! errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        })
    }else{
        const {email,password}=req.body;
        console.log(email,password,errors);
        return res.json({
            ok: true,
            mgs: "vientos / for login"
        });
    }
}

const refreshJWT=(req= request,res= response) =>{
    return res.json({
        id: "ok",
        mgs: "bientos / for refresh"
    });
}

module.exports = {
    crearUsuarios,
    loginUsuario,
    refreshJWT
}