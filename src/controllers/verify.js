const config = require('../config');
const jwt = require('jsonwebtoken');

const verify = ( req, res, next)=>{
       //hacemos una autenticacion:
    //por headers le pedimos token:
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: "no estas autorizado"
        });
    }
    //si existe lo verificamos con los metodos de JWT: 
   const decodificador =  jwt.verify(token, config.secret);
   req.userId = decodificador.id ; 
   console.log(decodificador);
   next();

};
module.exports = verify;