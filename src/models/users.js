const { Schema, model} = require('mongoose');
//importamos para poder cifrar pass:
const bcryptjs = require('bcryptjs');
//creamos modelo
const userSchema = new Schema ({
    username: String,
    email: String,
    password:String,
});

//ciframos su pass:
//extendemos userSchema y en sus methodos creamos encryptPassword  y lo llamamos en authController
userSchema.methods.encryptPassword = async (password) => {
    //metodo de la libreria que nos dice cuantas veces aplicara el algoritmo
    const salt = await bcryptjs.genSalt(10);
       //el siguiente metodo convierte el string:
    return bcryptjs.hash(password, salt);
};

//creamos otro metodo del objeto pero con ecma 5 
userSchema.methods.comparePassword = async function (password) {
   return  await bcryptjs.compare(password, this.password)
}

//una vez que tenemos el modelo lo guardamos en BD
//lo guardamos en User en base a Schema.
module.exports = model('User', userSchema);