const mongoose = require('mongoose'); // import module mongoose
const uniqueValidator = require('mongoose-unique-validator');

const userSchema= mongoose.Schema({
    firstName: { type: String,  required: true },
    lastName:{ type: String,  required: true },
    email: { type: String, unique: true, required: true },
    password:{ type: String,  required: true },
    role:{ type: String,  required: true },
})

userSchema.plugin(uniqueValidator)
const user = mongoose.model('User',userSchema )

module.exports=user

