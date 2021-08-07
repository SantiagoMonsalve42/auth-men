const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT= (req= request, res= response,next) => {

    const token = req.header('x-api-key');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            mgs: "error en el token",
        });
    }
    try {
        
        const {uid,name} = jwt.verify(token,process.env.SECRET_JWT_SEED);
        req.uid=uid;
        req.name=name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            mgs: "error en el token",
        });
    }

    next();
}

module.exports= {validarJWT}