const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const userschema = require('../Model/UserRegisterSchema')
const secretkey = "gcgfhgv#@5432%$vgvhbj"
const authorize = require('../Middlewares/verifyToken')

// User Registration  Route
router.post('/register',async(req,res)=>{
  
    const RegisterModeldata ={
        name:req.body.uname,
        email:req.body.email,
        number:req.body.number,
        password:req.body.password
    }
    const salt = await bcrypt.genSalt(9);
    await bcrypt.hash(req.body.password,salt).then(hashedpassword=>{
       if(hashedpassword){
        console.log("hashedpassword",hashedpassword)
        RegisterModeldata.password=hashedpassword;
       }
    })
    const postdata =new userschema(RegisterModeldata);
    await postdata.save().then(data=>{
        console.log(data)
        
    })
    res.json(postdata);
    
})


// User Login Route
router.post('/login',async(req,res)=>{
    
    const mail = req.body.email
    const Pass=req.body.password
    await userschema.findOne({email:mail}).then(existuser => {
     console.log('existuser',existuser)
     if(existuser && existuser._id){
         bcrypt.compare(Pass, existuser.password,(err,response) => {
             if(!err){
                 if(response){
                     const authToken = jwt.sign({_id : existuser._id, mail : existuser.email},secretkey,{expiresIn:'1h'})
                     res.json({status : 'ok', data: {authToken,response,existuser}})
                 }
             }
             else{
                 console.log(err,"jhjjj")
             }
         })
     }
    })
 

})


// menu route
router.get('/menu',authorize,(req,res) =>{
    if(req && req.decodedToken){
        res.json({status:"ok",data:"ok"});
    }
    else{
        res.json({status:"error",data:"error"});
    }
})

module.exports=router;