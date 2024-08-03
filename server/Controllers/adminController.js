import adminModel from "../Models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import CourseModel from "../Models/courseModel.js";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { adminName, email, password } = req.body;
    const checkEmail = await adminModel.findOne({ email:email });
    if (checkEmail)
      return res.status(409).json({ message: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const NewUser = new adminModel({
      adminName,
      email,
      password: hashedPassword,
    });
    await NewUser.save();
    res.status(201).json({ message: "admin user created successfully" });
  } catch (err) {
    console.error('Error while creating user:', err); 
    res.status(500).json({ message: 'Error while creating user' });
  }
  
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await adminModel.findOne({ email });
    if (!checkEmail)
      return res.status(409).json({ message: "User doesn't exist" });
    const checkPassword = await bcrypt.compare(password, checkEmail.password);
    if (!checkPassword)
      return res.status(403).json({ message: "Invalid password" });
    const token = jwt.sign({ email, role: "admin" }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    res.status(200).json({ message: "User logged in Succesfully", token });
  } catch (err) {
    res.status(500).json({ message: "Error while login user" });
  }
};

export const addCourse = async (req, res) => {
  const newCourseInfo = req.body;
  try {
    const checkCourse = await CourseModel.findOne({ title: newCourseInfo.title });
    if (checkCourse) {
      return res
        .status(403)
        .json({ message: "Course title is present already change the title" });
    }
    const newEntry = new CourseModel(newCourseInfo);
    await newEntry.save();
    res.status(200).json({ message: "Course added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
};
export const updateACourse = async (req, res) => {
  console.log("dsfsadf");
  const updateCourseInfo = req.body;
  const CourseId = req.params.id;
  try {
    const UpdatedCourse = await CourseModel.findOneAndUpdate(
      { _id: CourseId },
      updateCourseInfo,
      { new: true }
    );
    if (UpdatedCourse) {
      res.status(200).json({ msg: "Updated successfully", UpdatedCourse });
    } else {
      res.status(404).json({ msg: "id not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const allCourses = await CourseModel.find();
    res.status(200).json({ message: "Courses:", allCourses });
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
};
