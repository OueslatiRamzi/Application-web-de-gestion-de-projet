const mongoose = require('mongoose'); // import module mongoose

const clientSchema= mongoose.Schema({
    name:String,
    numFacture:String,
    valeurFacture:String,
    valeurReglement:String,
    moyenReglement:String,
    remarque:String,
})

const client = mongoose.model('Client',clientSchema )

module.exports=client