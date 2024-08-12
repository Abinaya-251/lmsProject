import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const verificationToken = async (req, res, next) => {
  // Retrieve the Authorization header from the request
  const authHeader = req.headers.authorization;
  // Check if the Authorization header is present and properly formatted (starts with "Bearer ")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }
  // Extract the token from the Authorization header (the part after "Bearer ")
  const token = authHeader.split(" ")[1];
  //Verify the token using the SECRET_KEY
  jwt.verify(token, SECRET_KEY, (err, value) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // If the role is 'admin', log it and attach the user's email to req.admin
    if (value.role === "admin") {
      req.admin = value.email;
      // If the role is 'student', log it and attach the user's email to req.student
    } else if (value.role === "student") {
      req.student = value.email;
    } else {
      return res.status(401).json({ message: "Invalid user role" });
    }

    next();
  });
};
