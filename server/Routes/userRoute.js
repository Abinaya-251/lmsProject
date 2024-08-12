import express from "express";
import {
  getAllCourses,
  login,
  purchaseACourse,
  purchasedCourses,
  signup,
} from "../Controllers/userController.js";
import { verificationToken } from "../middleware/Auth.js";
const Router = express.Router();

Router.post("/signup", signup);
Router.post("/login", login);
Router.get("/getallCourses", getAllCourses);
Router.post("/purchaseCourse/:id", verificationToken, purchaseACourse);
Router.get("/purchasedCourses", verificationToken, purchasedCourses);

export default Router;
