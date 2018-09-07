var mongoose=require("mongoose");
var schema=mongoose.Schema({
email:{type:String,required:true,unique:true},
Password:{type:String,require:true}
});
module.exports=mongoose.model("Users",schema);