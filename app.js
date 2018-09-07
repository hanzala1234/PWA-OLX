var http= require('http');
var express=require('express');
var logger=require('morgan');
var parser=require('body-parser');
var path=require('path');
var mongoose=require('mongoose');

var router=require('./router.js');
var port=process.env.PORT||3030;
mongoose.connect("mongodb://Muhammad:hanzala12@ds127841.mlab.com:27841/mydatabase",function(err){
    if(!err) console.log("Database created");
});

var app=express();
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine",'ejs');
app.use(logger("tiny"));
app.use(express.static(path.resolve(__dirname,"myFiles")));
app.use(parser.urlencoded({extended:false}));
app.use(router);
http.createServer(app).listen(port);