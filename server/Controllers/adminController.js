import adminModel from "../Models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import CourseModel from "../Models/courseModel.js";
dotenv.config();

//Admin register
export const signup = async (req, res) => {
  try {
    const { adminName, email, password } = req.body;
    // Check if email is exists
    const existingEmail = await adminModel.findOne({ email: email });
    if (existingEmail)
      return res.status(409).json({ message: "Email already exists" });
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Create new admin
    const NewUser = new adminModel({
      adminName,
      email,
      password: hashedPassword,
    });
    await NewUser.save();
    res.status(201).json({ message: "admin user created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error while creating user" });
  }
};

//Admin Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check if email is exists
    const checkEmail = await adminModel.findOne({ email });
    if (!checkEmail)
      return res.status(409).json({ message: "User doesn't exist" });
    //Validate passsword
    const checkPassword = await bcrypt.compare(password, checkEmail.password);
    if (!checkPassword)
      return res.status(403).json({ message: "Invalid password" });
    //Genrate JWT token
    const token = jwt.sign({ email, role: "admin" }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    res.status(200).json({ message: "User logged in Succesfully", token });
  } catch (err) {
    res.status(500).json({ message: "Error while login user" });
  }
};

//Add a new course
export const addCourse = async (req, res) => {
  const newCourseInfo = req.body;
  try {
    //Check if course is exists
    const checkCourse = await CourseModel.findOne({
      title: newCourseInfo.title,
    });
    if (checkCourse) {
      return res
        .status(403)
        .json({ message: "Course title is present already change the title" });
    }
    //Create a new course
    const newEntry = new CourseModel(newCourseInfo);
    await newEntry.save();
    res.status(200).json({ message: "Course added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
};

// Update a course
export const updateACourse = async (req, res) => {
  const updateCourseInfo = req.body;
  const CourseId = req.params.id;
  try {
    //Find by id and update
    const UpdatedCourse = await CourseModel.findByIdAndUpdate(
      CourseId,
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

//View all courses including unpublished courses
export const getAllCourses = async (req, res) => {
  try {
    //Get all courses
    const allCourses = await CourseModel.find();
    res.status(200).json({ message: "Courses:", allCourses });
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
};
