const User = require("../models/User");
const router=require("express").Router();
const bcrypt=require("bcrypt");
const { response } = require("express");

router.post("/register",async (req,res)=>{
    
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        }); 

        const user = await newUser.save();
        res.status(260).json(user);
    } catch(err){
        console.log(err);
    }
  
});


// login

router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
         !user && res.status(408).json("user not found"); 
        
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(400).json("wrong password")
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports=router;