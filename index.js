const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/User.routes")
const {noteRouter}=require("./routes/Notes.routes")
const {auth}=require("./middleware/auth.middleware")
require("dotenv").config()

const cors=require("cors")

const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/user",userRouter)
app.use(auth)
app.use("/notes",noteRouter)



app.listen(4040,async()=>{
    await connection
console.log("server is running at 4040")
})