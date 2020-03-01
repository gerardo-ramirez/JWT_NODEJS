const app = require('./app');
 require('./database');
//setting
app.set('port', process.env.PORT || 8080);

//listen 
//USANDO SOLO DE PRUEBA ASYNC AWAIT:
async function init(){
    await app.listen(app.get('port'),()=>{
        console.log('server on port 8080')
    });
    
}

 ;
 init();