import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import adminRouter from "./Routes/adminRoute.js"
import userRouter from "./Routes/userRoute.js"

const app = express(); 
dotenv.config()
app.use(express.json())
app.use(cors())
app.use("/admin",adminRouter)
app.use("/student",userRouter)

//CONNECT TO DB 
const connectDb = async()=>{
    try{
      await mongoose.connect(process.env.DB)
      console.log("conntected to DB")
    }catch(err){
        console.log("Error while connecting to db ", err)
    }
    
}
//LISTENING TO PORT
app.listen(process.env.PORT,()=>{
    console.log("server is listening on port 5000");
    connectDb()
})