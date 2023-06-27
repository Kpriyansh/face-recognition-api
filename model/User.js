const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        min:10,
        max:100,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:3,
        
    },
   rank: {
       type: Number,
       default: 0
   }

    
},
{
    timestamps:true
}

);

module.exports = mongoose.model('User',UserSchema);