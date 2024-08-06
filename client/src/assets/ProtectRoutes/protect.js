import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protect = () => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default Protect;
