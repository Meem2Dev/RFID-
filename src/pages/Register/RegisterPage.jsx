import React, { useState } from "react";
import "../../assets/styles/register.css";

const RegisterPage = () => {
  const [rfid, setRfid] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [authorized, setAuthorized] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  const [printerName, setPrinterName] = useState("");
  const [printerMessage, setPrinterMessage] = useState("");

  const handleUserRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rfid_uid: rfid,
          name: name,
          role: role,
          authorized: authorized,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail);
      setUserMessage(`User ${name} added successfully!`);
    } catch (err) {
      setUserMessage(`Error: ${err.message}`);
    }
  };

  const handlePrinterRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/printers/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: printerName }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail);
      setPrinterMessage(`Printer ${printerName} registered successfully!`);
    } catch (err) {
      setPrinterMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="register-page">
      <h1>Register Users & Printers</h1>

      {/* User Registration Form */}
      <div className="register-section">
        <h2>Register a New User</h2>
        <input type="text" placeholder="RFID UID" value={rfid} onChange={(e) => setRfid(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <label>
          <input type="checkbox" checked={authorized} onChange={() => setAuthorized(!authorized)} />
          Authorized to Print?
        </label>
        <button onClick={handleUserRegister}>Register User</button>
        {userMessage && <p>{userMessage}</p>}
      </div>

      {/* Printer Registration Form */}
      <div className="register-section">
        <h2>Register a New Printer</h2>
        <input type="text" placeholder="Printer Name" value={printerName} onChange={(e) => setPrinterName(e.target.value)} />
        <button onClick={handlePrinterRegister}>Register Printer</button>
        {printerMessage && <p>{printerMessage}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
