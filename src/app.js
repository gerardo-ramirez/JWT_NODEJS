//bryptjs : me cifra la contaseña
//jwt: me envia un token.

const express = require('express');
const app = express();
const root = require('./controllers/authController')

app.use(express.json());
//entender los datos de un formularioy convertirlos en java script. 
app.use(express.urlencoded({extended: false}));
app.use(root);

module.exports = app;