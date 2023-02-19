const express=require("express")
const{UserModel}=require("../models/User.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
    console.log(pass)
    try{
        bcrypt.hash(pass,3,async(err,hash)=>{
            if(err){
                res.send(err)
            }
            else{
                const user=new UserModel({name,email,pass:hash})
                await user.save()
                res.send("User registered")
            }
        })
       
    }catch(err){
        res.send({"err":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
       
        const user=await UserModel.find({email})
        if(user.length>0){
            console.log(user)
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user[0]._id},"masai")
                    res.send({"msg":"logged in","token":token,"name":user[0].name})
                }else{
                   res.send("wrong credential")
                }
            })
            
        }else{
            res.send({"msg":"wrong credential"})
        }
    }catch(err){
        res.send({"err":err.message})
    }

})

module.exports={userRouter}