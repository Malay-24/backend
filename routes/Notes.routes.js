const express=require("express")
const {NoteModel}=require("../models/Notes.model")

const noteRouter=express.Router()


noteRouter.get("/",async(req,res)=>{
    const notes=await NoteModel.find()
    res.send(notes)
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    
    try{
        const note=new NoteModel(payload)
        await note.save()
        res.send("note created")
    }catch(err){
        console.log(err)
        res.send("not posted")
    }
    
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    console.log(id)
    const note=await NoteModel.findOne({"_id":id})
    console.log(note)
    const userID_in_note=note.userId
    const user_ID=req.body.userId
    try{
        if(userID_in_note===user_ID){
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
        res.send("updated")
        }else{
            res.send("you are not authorized")
        }
        
    }catch(err){
        console.log(err)
        res.send("not updated")
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
   
    const note=await NoteModel.findOne({"_id":id})
    console.log(note)
    const userID_in_note=note.userId
    console.log(userID_in_note)
    const user_ID=req.body.userId
    console.log(user_ID)
    try{
        if(userID_in_note===user_ID){
            await NoteModel.findByIdAndDelete({"_id":id})
        res.send("Deleted")
        }else{
            res.send("you are not authorized")
        }
        
    }catch(err){
        console.log(err)
        res.send("not Deleted")
    }
    
})

module.exports={noteRouter}