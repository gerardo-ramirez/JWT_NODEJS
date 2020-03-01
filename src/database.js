const mongoose  = require('mongoose');

mongoose.connect('mongodb://den1.mongo1.gear.host:27001/simplejwt',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    user:"simplejwt",
    pass:"Ga0yKP-~fd0C",
})
.then(db => console.log('db connect'))
.catch(err => console.log('error db'));