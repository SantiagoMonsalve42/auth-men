const jwt = require('jsonwebtoken');

const generarJwt = (uid,name) =>{
    
    const paiload= {uid,name};

    return new Promise((resolve, reject) =>{
        jwt.sign(paiload,process.env.SECRET_JWT_SEED,{
            expiresIn:'12h'
        },(err,token) =>{
            
            if(err){
                console.log(err)
                reject(err);
            }else{
                resolve(token);
            }
    
        });
    });
    

}

module.exports = {generarJwt};