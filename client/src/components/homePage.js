import React, { useState } from "react";
import axios from "axios";
import devopsIMG from "../assets/images/devops.png";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "../assets/styles/Homepage.css"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(true);
  const [invalidError, setInvalidError] = useState();
  const Navigate = useNavigate();

  const Onsubmit = (data) => {
    if (data.role === "student") {
      axios
        .post("http://localhost:5000/student/login", data)
        .then((response) => {
          console.log("Data saved:", response.data);
          Navigate("/dashboard");
        })
        .catch((error) => {
          setInvalidError("Invalid Email or password");
          console.error("Error saving data:", error);
        });
    } else {
      axios
        .post("http://localhost:5000/admin/login", data)
        .then((response) => {
          console.log("Data saved:", response.data);
          Navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          setInvalidError("Invalid Email or password");
        });
    }
  };
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div class="container w-50 mt-5 p-5 border shadow-lg rounded">
      <img src={devopsIMG} alt="devops icon" width={100}></img>
      <h2 class="fw-bold">Sign in</h2>
      <form onSubmit={handleSubmit(Onsubmit)}>
        <div className="row ">
          <div class="col-sm-2 p-2 mt-3 ml-5 border border-dark rounded">
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              {...register("role", { required: "Please select an option" })}
            />
            <label htmlFor="admin" className="fw-bold fs-6">
              Admin
            </label>
          </div>

          <div class="col-sm-2 p-2 mt-3 ml-5 border border-dark rounded role">
            <input
              type="radio"
              id="student"
              name="role"
              value="student"
              {...register("role", { required: "Please select an option" })}
            />
            <label htmlFor="student" class="fw-bold fs-6">
              Student
            </label>
          </div>
          {errors.role && (
            <span class="col-sm-3 p-3 w-50 text-danger">
              {errors.role.message}
            </span>
          )}
        </div>
        <div className="row mt-3">
          <label class="row fw-bold fs-6">Email:</label>
          <input
            className="col-sm-5 p-1 border border-dark rounded"
            type="email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Entered value does not match email format",
              },
            })}
          ></input>
          {errors.email && (
            <span class="col text-danger">{errors.email.message}</span>
          )}
          <label class="row fw-bold fs-6">Password:</label>
          <div className="row">
            <input
              class="col-sm-5 p-1 h-80 w-50 border border-dark rounded"
              type={showPassword ? "password" : "text"}
              {...register("password", { required: "Password is required" })}
            ></input>
            <button
              class="col-sm-1 h-80 eyeicon "
              onClick={(e) => handleShowPassword(e)}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
            {errors.password && (
              <span class="col-sm-3 w-50 text-danger">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <div class="col">
          <button className="row mt-3 p-2 border fw-bold fs-6 border-dark rounded bg-secondary">
            Login
          </button>
          {invalidError && <h5 class="mt-3 text-danger">{invalidError}</h5>}
        </div>
      </form>
    </div>
  );
}

export default HomePage;
