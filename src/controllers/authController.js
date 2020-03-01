const {Router} = require('express');
const router = Router();
//IMPORTAMOS PARA PODER GUARDAR EN LA db:
const User = require('../models/users');

//importamos el modulo del que luego obtendremmos el jwt:
const jwt = require('jsonwebtoken');
//importamos el objeto creado en config para pasarselo a jwt como parametro secret:
const config = require('../config');
const verify = require('./verify');
//registro
//capturamos desde las peticiones el user, email, pass:
router.post('/signup', async (req, res, next)=>{
    const { username, email, password } = req.body;
    //requerimos el modelo para guardar en DB la info que capturamos:

    //guardamos los datos en la DB 
    //opcion 1
   /* User.create({
        username,
        email,
        password
    });*/
    //opcion 2
    const user = new User({
        username,
        email,
        password
    });
    //encriptamos pass:
    user.password = await user.encryptPassword(password);
    //una vez que ciframos la pass guardamos el user en BD
    await user.save();
    //una vez importamos el modulo de JWT. lo creamos:
    //espera como payload (un dato) y un secret que configuramos en config, le pasamos el id del user.
    //tambien podemos pasarle un tiempo de exipacion en este caso 1 dia. 
    const token =jwt.sign({id:user._id}, config.secret,{
        expiresIn: 60 * 60 * 24
    });
    
    res.json({auth: true, token});
});
//login
router.post('/singin', async (req, res, next)=>{
    const {email, password } = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(404).send('no exixte mail');
    }
    //vemos si existe el pass:
   const passwordIsValidate = await user.comparePassword(password);
   if(!passwordIsValidate){
       return res.status(404).send('token null');
   }
   //si todo esta bien le enviamos un token . 
   const token =jwt.sign({id:user._id}, config.secret,{
    expiresIn: 60 * 60 * 24
});

    res.json({auth: true, token});

});
//obtener info:
router.get('/me', verify, async (req, res, next)=>{
    //*****esta funcion la importamos desde otro archivo puers puede volverse a utilizar: */
   /*
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
   console.log(decodificador);
*/
   //****----------------******
   //importamos la funcion anterior :

   //filtramos si existe el id: como no quiero mostrar el pass agrego {password:0}
 
   const usuario = await User.findById(req.userId,{password: 0});
   //el req.userId  viene de la funcion verify
   if(!usuario){
       return res.status(404).send('no user founf¿d');
   }
    res.json(usuario);

});
module.exports = router;