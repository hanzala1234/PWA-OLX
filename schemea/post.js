var mongoose=require("mongoose");

var schema=mongoose.Schema({
title:{type:String,require:true},
category:{type:String,require:true},
price:{type:Number,require:true},
discription:{type:String},
pics:Array,
name:String,
phone:Number,
createdAt:{type:Date,default:Date.now()},
createdBy:String
});
module.exports=mongoose.model("Ads",schema);