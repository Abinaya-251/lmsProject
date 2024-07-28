import React, { useState } from 'react'
import Navbar from './navbar.js'
import Addstudent from "../assets/images/student.png"
import Addcourse from "../assets/images/addCourse.png"
import {  useNavigate } from 'react-router-dom'

function Dashboard() {
  const [role,setRole] = useState("admin")
  const Navigate = useNavigate();
  const handleAddStudentBtn = () =>{
      Navigate("/addStudent")
  }
  return (
    <div>
        <Navbar role={role}/>
            <div className="d-flex justify-content-center">
          <div className="row w-50 mt-5 p-5 border shadow-lg rounded">
            <div className="col-sm d-flex justify-content-center mb-3">
              <button className="btn btn-outline-dark d-flex flex-column align-items-center p-3" style={{ height: '240px' }}>
                <img src={Addstudent} alt="Add Student" className="mb-2" style={{ width: '180px', height: '160px' }} onClick={handleAddStudentBtn}/>
                <p className="mb-0">Add Student</p>
              </button>
            </div>
            <div className="col-sm d-flex justify-content-center">
              <button className="btn btn-outline-dark d-flex flex-column align-items-center p-3" style={{ height: '240px' }}>
                <img src={Addcourse} alt="Add Course" className="mb-2" style={{ width: '180px', height: '160px' }} />
                <p className="mb-0" onClick={handleAddStudentBtn}>Add Course</p>
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Dashboard