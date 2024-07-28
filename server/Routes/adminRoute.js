import express from "express"
import { addCourse, getAllCourses, login, signup, updateACourse } from "../Controllers/adminController.js"
import { verificationToken } from "../middleware/Auth.js"
const Router = express.Router()

Router.post("/signup",signup)
Router.post("/login",login)
Router.post("/addCourse",verificationToken,addCourse)
Router.get("/getAllCourse",verificationToken,getAllCourses)
Router.put("/updateCourse/:id",verificationToken,updateACourse)
export default Router;