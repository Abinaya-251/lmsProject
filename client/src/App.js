import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/homePage.js";
import Dashboard from "./components/dashboard.js";
import AddStudent from "./components/addNewStudent.js";
import Navbar from "./components/navbar.js";
import Protect from "./assets/ProtectRoutes/protect.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userType, setUserType] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedIsLoggedIn = window.localStorage.getItem("isLoggedIn") === "true";
    const storedUserType = window.localStorage.getItem("userType");
    setIsLoggedIn(storedIsLoggedIn);
    setUserType(storedUserType);
    console.log("inside",isLoggedIn,"u",userType,location.pathname);
  },[]);
  if (isLoggedIn === null) {
    window.localStorage.setItem('isLoggedIn', 'false');
  }

  console.log("outside",isLoggedIn,"u",userType,location.pathname);
  
  
  return (
    <>
      {isLoggedIn && location.pathname !== "/" && (
        <Navbar userType={userType} />
      )}

      <Routes>
        <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn} setUserType={setUserType}/>} />
        {/* Protected Routes */}
        <Route element={<Protect />}>
          <Route
            path="/dashboard"
            element={
            <Dashboard/>
            }
          />
          <Route
            path="/addStudent"
            element={
              userType === "admin" ? <AddStudent /> : <Navigate to="/" /> // Redirect if userType is not student
            }
          />
        </Route>

        {/* Redirect undefined routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
