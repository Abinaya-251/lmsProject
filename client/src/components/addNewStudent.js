import React, { useState } from 'react';
import axios from 'axios';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form"
import studenticon from "../assets/images/student.png"

function LoginForm() {
  const {register,handleSubmit,formState:{errors}} = useForm();
  const[showPassword,setShowPassword] = useState(false);
  const [invalidError,setInvalidError]= useState();
  const navigate = useNavigate()

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };


  const Onsubmit = (data) => {
    axios.post("http://localhost:5000/student/signup", data)
      .then(response => {
        console.log('Data saved:', response.data);
        navigate("/dashboard");
      })
      .catch(error => {
        setInvalidError("Invalid Email or password");
        console.error('Error saving data:', error);
      });
  };

  return (
    <div>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4 w-50">
                <div className="card border shadow-lg rounded p-4">
                  <img src={studenticon} width={50} alt="Student Icon" />
                  <h3 className="card-title mb-4">Sign Up</h3>
                  <form onSubmit={handleSubmit(Onsubmit)}>
                    <div className="mb-3">
                      <label className="fw-bold fs-6" htmlFor='studentName'>Student Name:</label>
                      <div className="d-flex">
                        <input
                          className={`form-control ${errors.studentName ? 'is-invalid' : ''}`}
                          type="text"
                          id='studentName'
                          name='studentName'
                          {...register("studentName",{required:"Enter the Student name"})}
                        />
                        {errors.studentName && <div className="invalid-feedback d-inline-block ms-2">{errors.studentName.message}</div>}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="fw-bold fs-6" htmlFor='email'>Email:</label>
                      <div className="d-flex">
                        <input
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          type="email"
                          id='email'
                        
                          {...register("email",{required:"Enter the Email",pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Entered value does not match email format",
                          },})}
                        />
                        {errors.email && <div className="invalid-feedback d-inline-block ms-2">{errors.email.message}</div>}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="fw-bold fs-6">Password:</label>
                      <div className="d-flex">
                        <input
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          type={showPassword ? 'text' : 'password'}
                          {...register("password", { required: "Password is required",minLength:{value:6,message:"Atleast 6 character"} })}
                        />
                        <button className="btn btn-outline-secondary ms-2" type="button" onClick={handleShowPassword}>
                          {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </button>
                        {errors.password && <div className="invalid-feedback d-inline-block ms-2">{errors.password.message}</div>}
                      </div>
                    </div>
                    <button type="submit" className="btn btn-secondary fw-bold fs-6 border-dark rounded">
                      Login
                    </button>
                    {invalidError && <div className="mt-3 text-danger">{invalidError}</div>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default LoginForm;
