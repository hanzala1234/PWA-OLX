var express = require("express");
var  users= require('./schemea/registerSchema.js');
var  ads= require('./schemea/post.js');
var path =require('path');
var multer = require('multer');
var router = express.Router();

var app =express();

var storage=multer.diskStorage({

destination: function(req,file,cb){
    cb(null, 'myFiles/uploads/');
    
},
filename: function(req,file,cb){
   var ext=path.extname(file.originalname);
   cb(null,  file.fieldname+ '-' + Date.now()+ext);
   //cb(null,file.fieldname+"-"+Date.now()+ext);
}

});
var upload=multer({storage:storage});

router.post('/posting.html',upload.array('pics'),function(req,res){
    var pictures=[];
    req.files.forEach(function(file){
        var fname;
 if(file.path.indexOf('myFiles\/')!=-1) fname=file.path.replace("myFiles\/","");
 else fname=file.path.replace("myFiles\\","");
        
 pictures.push(fname);
    });
  
    var name=req.body.name;  var discription=req.body.discription;
  var title=req.body.title;   var phone=req.body.phone;
  var price=req.body.price; var category =req.body.category;
  var createdBy=req.body.createdBy;
  
  var newad=new ads({title:title,discription:discription,category:category,price:price,pics:pictures,name:name,
    phone:parseInt(phone),createdBy:createdBy});
    
    newad.save(function(err){
        if(err) res.send("error there"+ err);
         
        res.redirect('ads?category='+category);
        
    });
    
    

});

router.get("/registration",function(req,res){
    var cat=req.query.verb;
    res.render("registration",{status:cat,message:"",email:""});
});

router.post("/registration",function(req,res){
    var email=req.body.Email;
    var password= req.body.Password;
    
    users.find({email:email},function(err,result){
        
        if(result.length==0){
            
                var model = new users({email:email,Password:password});
                    model.save(function(err){
                        if(!err){ console.log("Person  added");
          res.render("registration",{status:"signup",message:"Sucessfully created",email:email});
                    }
                    });  
        
                }else{
                    res.render("registration",{status:"signup",message:"Email already exsist",email:""});
        }
    })
   
});
router.post("/signin",function(req,res){
    var email=req.body.Email_Log;
    var Pass=req.body.Pass_Log;
    users.findOne({email:email},function(err,result){
        if(result){
            if(Pass==result.Password){
            res.render("registration",{status:"login",message:"Sucessfully Login",success:true,email:email});
            }else{
                res.render("registration",{status:"login",message:"Email and Password doesnot match",email:""});
            }
        }
        else{
            res.render("registration",{status:"login",message:"No such user exsist",email:""});   
        }
    });
});

router.get("/ads",function(req,res){
    var category=req.query.category;
    
    ads.find({category:category},function(err,result){
        var obj=result;
        if(result){ res.render('ads',{objects:obj});}
    });
    //res.render("ads");
});
router.get('/discription',function(req,res){
    console.log(req.query.id);
    ads.findOne({_id:req.query.id},function(err,result){
        if(err) res.send("error here"); 
        if(result) res.render('discription',{object:result});

    })
    
});
router.get("/object",function(req,res){
    
  
   ads.findOne({_id:req.query.id},function(err,result){
    if(err) throw error; 

    if(result) res.json(result);

})
});
router.get('/mySearch',function(req,res){
    console.log("executed");
var text=req.query.search;
ads.find({$or: [{title:text},{discription:text}] },function(err,result){
     if(result) res.render('ads',{objects:result});
});
});

module.exports=router;