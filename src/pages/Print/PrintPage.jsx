import React, { useState, useEffect } from "react";
import "../../assets/styles/print.css";

const PrintPage = ({ user }) => {
  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPrinters();
  }, []);

  const fetchPrinters = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/printers/");
      const data = await response.json();
      setPrinters(data);  // API returns an array, so assign it directly
    } catch (error) {
      console.error("Error fetching printers:", error);
    }
  };

  const handlePrint = async () => {
    if (!user) {
      alert("Please log in first!");
      return;
    }
    if (!selectedPrinter) {
      alert("Select a printer first!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/print-jobs/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: 1, printer_id: selectedPrinter }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error sending print job.");
    }
  };

  return (
    <div className="print-page">
      <h1>Print Your Document</h1>
      {user ? <p>Logged in as: {user}</p> : <p>Please scan your RFID card first.</p>}
      
      <select onChange={(e) => setSelectedPrinter(e.target.value)}>
        <option value="">Select a Printer</option>
        {printers.map((printer) => (
          <option key={printer.id} value={printer.id}>
            {printer.name}
          </option>
        ))}
      </select>

      <button className="print-button" onClick={handlePrint}>Print</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PrintPage;
