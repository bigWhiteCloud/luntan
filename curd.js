const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email:{
        type:String,
        require:true         
    },
    nickname:{
        type:String,
        require:true         
    },
    password:{
        type:String,
        require:true         
    }
});
module.exports = mongoose.model("user",userSchema);