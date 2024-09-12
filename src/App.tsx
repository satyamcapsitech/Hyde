import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.tsx";
import Home from "./components/Home.tsx";
import Signup from "./components/Signup.tsx";
import Admin from "./components/Admin/Admin.tsx";
import User from "./components/User/User.tsx";

function App() {
  
  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/User" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
