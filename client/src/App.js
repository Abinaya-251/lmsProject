import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/homePage.js";
import Dashboard from "./components/dashboard.js";
import AddStudent from "./components/addNewStudent.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addStudent" element={<AddStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
