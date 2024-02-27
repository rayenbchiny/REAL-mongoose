const mongoose = require("mongoose");

//Create a person with this prototype:

const userSchema=new mongoose.Schema({
    name:{type:String ,required:true},
    age:{type:Number},
    favoriteFood:[String]
})

const user=mongoose.model("user",userSchema)
module.exports=user
