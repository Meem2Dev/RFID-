import React, { useState, useEffect } from "react";
import "../../assets/styles/printers.css";

const PrintersPage = () => {
  const [printers, setPrinters] = useState([]);

  useEffect(() => {
    fetchPrinters();
  }, []);

  const fetchPrinters = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/printers/");
      const data = await response.json();
      setPrinters(data);
    } catch (error) {
      console.error("Error fetching printers:", error);
    }
  };

  return (
    <div className="printers-page">
      <h1>Printers</h1>
      <table className="printers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Printer Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {printers.map((printer) => (
            <tr key={printer.id}>
              <td>{printer.id}</td>
              <td>{printer.name}</td>
              <td className={printer.status === "available" ? "available" : "unavailable"}>
                {printer.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrintersPage;
