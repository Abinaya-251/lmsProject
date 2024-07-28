import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const verificationToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, value) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log("Valid User:", value);

    if (value.role === "admin") {
      console.log("Valid Admin:", value);
      req.admin = value.email;
    } else if (value.role === "student") {
      console.log("Valid Student:", value);
      req.student = value.email;
    } else {
      return res.status(401).json({ message: "Invalid user role" });
    }

    next();
  });
};
