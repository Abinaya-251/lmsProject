import userModel from "../Models/userModel.js"
import jwt from "jsonwebtoken" 
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import CourseModel from "../Models/courseModel.js"

dotenv.config()

export const signup = async(req,res) =>{
   try{
        const {studentName,email,password} = req.body
        const checkEmail = await userModel.findOne({email})
        if(checkEmail) return res.status(409).json({ message: 'Email already exists' });
        const hashedPassword = await bcrypt.hash(password,10)
        
        const NewUser = new userModel({studentName,email,password:hashedPassword})
        await NewUser.save()
        res.status(201).json({message:'User created successfully',NewUser})
    }catch(err){
        res.status(500).json({message:'Error while creating user'})
    }
}

export const login = async(req,res) =>{
    try{
        const {email,password} = req.body
        const checkEmail = await userModel.findOne({email})
        if(!checkEmail) return res.status(409).json({ message: "User doesn't exist" });
        const checkPassword = await bcrypt.compare(password,checkEmail.password)
        if(!checkPassword)  return res.status(403).json({ message: "Invalid password" });
        const token  = jwt.sign({email, role:"student"}, process.env.SECRET_KEY, {expiresIn:'30d'});
        res.status(200).json({message:"User logged in Succesfully", token});
    }catch(err){
        res.status(500).json({message:'Error while login user'})
    }
}

export const getAllCourses =  async(req,res) =>{
     try{
        const Getcourses = await CourseModel.find({published:true})
        res.status(200).json({message:"Get all courses",Getcourses})
     }catch(err){
        res.status(500).json({message:'Error while get courses'})
    }
}

export const purchaseACourse = async(req,res)=>{
    const courseId = req.params.id
    try{
        const Course = await CourseModel.findOne({_id:courseId})
        if(!Course)
            return res.status(400).json({message:"course is not found"})
        
        const Student = await userModel.findOne({email:req.student})
        if(!Student)
            return res.status(400).json({message:"user is not found"})
        if (!Student.purchasedCourses) {
            Student.purchasedCourses = [];
        } 
        if (Student.purchasedCourses.includes(courseId)) {
            return res.status(400).json({ message: 'Course already purchased' });
          }
        Student.purchasedCourses.push(courseId)
        await Student.save();
        Course.NumberOfStudentPurchased += 1;
        await Course.save();
        console.log(Student);
        res.json({ message: 'Course purchased successfully', purchasedCourses:Student.purchasedCourses,Student:Student});
        
        
    }catch(err){
        console.error('Error during course purchase:', err);
        res.status(500).json({message:'Internal Error'})
    }
}

export const purchasedCourses = async(req,res)=>{
    try{
        const user = await userModel.findOne({email:req.student}).populate("purchasedCourses")
        res.status(200).json({"purchased_Courses":user})
     }catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    } 
}