import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import MainPage from "./pages/Main/MainPage"; 
import UsersPage from "./pages/Users/UsersPage";
import PrintPage from "./pages/Print/PrintPage";
import RegisterPage from "./pages/Register/RegisterPage";
import Footer from "./components/Footer";
import "./assets/styles/app.css";

function App() {
  useEffect(() => {
    document.title = "RFID Secured Printers";
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} /> 
          <Route path="/users" element={<UsersPage />} />
          <Route path="/print" element={<PrintPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
