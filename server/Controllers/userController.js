import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import CourseModel from "../Models/courseModel.js";
import sendMail from "../utlis/sendEmail.js";

dotenv.config();

// Register user
export const signup = async (req, res) => {
  try {
    const { studentName, email, password } = req.body;
    // Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "Email already exists" });
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new userModel({
      studentName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // Prepare data for email template
    const emailData = { studentName };
    // Send welcome email
    try {
      await sendMail({
        email: email,
        subject: "Welcome to Our Service",
        template: "registerMail.ejs",
        data: emailData,
      });
      res.status(201).json({ message: "User created successfully", newUser });
    } catch (err) {
      console.error("Error sending email:", err);
      res.status(500).json({ message: "Error while sending welcome email" });
    }
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Error while creating user" });
  }
};

//Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if email exists
    const checkEmail = await userModel.findOne({ email });
    if (!checkEmail)
      return res.status(409).json({ message: "User doesn't exist" });
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, checkEmail.password);
    if (!isPasswordValid)
      return res.status(403).json({ message: "Invalid password" });
    //Genrate JWT token
    const token = jwt.sign({ email, role: "student" }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    res.status(200).json({ message: "User logged in Succesfully", token });
  } catch (err) {
    res.status(500).json({ message: "Error while login user" });
  }
};

// View all courses which are published
export const getAllCourses = async (req, res) => {
  try {
    // Get all published courses
    const Getcourses = await CourseModel.find({ published: true });
    res.status(200).json({ message: "Get all courses", Getcourses });
  } catch (err) {
    res.status(500).json({ message: "Error while get courses" });
  }
};

// Course purchased by User
export const purchaseACourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    //Check course is exists
    const Course = await CourseModel.findOne({ _id: courseId });
    if (!Course)
      return res.status(404).json({ message: "course is not found" });
    // Check user is exists
    const Student = await userModel.findOne({ email: req.student });
    if (!Student) return res.status(404).json({ message: "user is not found" });
    //Chech course is exists
    if (Student.purchasedCourses.includes(courseId)) {
      return res.status(400).json({ message: "Course already purchased" });
    }
    //Add course to user's purchased courses
    Student.purchasedCourses.push(courseId);
    await Student.save();
    //Increment the count when course is purchased
    Course.NumberOfStudentPurchased += 1;
    await Course.save();

    //Data for email template
    const emailData = {
      StudentName: Student.studentName,
      CourseName: Course.title,
    };

    // Send confirmation email
    try {
      await sendMail({
        email: Student.email,
        subject: "Course purchase confirmation",
        template: "coursePurchase.ejs",
        data: emailData,
      });
      res.status(200).json({
        message: "Course purchased successfully",
        purchasedCourses: Student.purchasedCourses,
        Student: Student,
      });
    } catch (err) {
      res.status(500).json({ message: "Error while sending email" });
      console.error("Error sending purchase confirmation email:", err);
    }
  } catch (err) {
    console.error("Error during course purchase:", err);
    res.status(500).json({ message: "Internal Error" });
  }
};

//View all purchased courses to the user
export const purchasedCourses = async (req, res) => {
  try {
    //Find the user and populate the courses
    const user = await userModel
      .findOne({ email: req.student })
      .populate("purchasedCourses");
    res.status(200).json({ purchased_Courses: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
