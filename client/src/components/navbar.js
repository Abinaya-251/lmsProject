import React from 'react'
import devopsIMG from "../assets/images/devops.png";

function Navbar({role}) {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
        <div className="d-flex align-items-center">
            <img src={devopsIMG} alt="devops icon" width={50} className="me-2" />
            <h1 className="text-white mt-2 me-2">DEVOPS</h1>
          </div>          
          <h2 className="btn my-2 my-sm-0 text-white">LOGOUT</h2>
        </div>
      </nav>
    </div>
  )
}

export default Navbar