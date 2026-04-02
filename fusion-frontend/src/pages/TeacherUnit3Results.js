import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function TeacherUnit3Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("fusionUser"));

  if (!user) {
    console.error("User not found");
    return;
  }

  const teacherId = user.id;              // ✅ FIXED
  const section = user.sections?.[0];     // ✅ FIXED (first section)

  console.log("Sending:", { teacherId, section });

  axios.get("https://fusion-backend-testing.onrender.com/api/assignments/performance", {
    params: {
      unit: 3,
      teacherId,
      section
    }
  })
  .then((res) => {
  console.log("FULL RESPONSE:", res.data);   // 👈 ADD THIS

  const data = res.data.performances ?? res.data ?? [];

  console.log("FINAL DATA:", data);          // 👈 ADD THIS

  setResults(data);
})
  .catch((err) => {
    console.error("Error fetching results:", err);
  });
}, []);
  /* --------------------------------------------------
      EXPORT TO EXCEL
  -------------------------------------------------- */
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(results);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

    XLSX.writeFile(workbook, "Unit_3_Assignment_Results.xlsx");
  };

  /* --------------------------------------------------
      EXPORT TO PDF
  -------------------------------------------------- */
  const exportToPDF = () => {
  const doc = new jsPDF();

  doc.text("Unit 3 - Assignment Results", 14, 15);

  autoTable(doc, {
    startY: 20,
    head: [['Name', 'Roll Number', 'Correct', 'Wrong', 'Accuracy']],
    body: results.map(p => [
      p.studentName,   // ✅ FIXED
      p.rollNumber,
      p.correct,
      p.wrong,
      `${p.accuracy}%`
    ])
  });

  doc.save("results.pdf");
};
  return (
    <div className="learn-container">

      <div className="glass-card" style={{ padding: "25px", width: "80%", margin: "auto" }}>
        <h1 className="dashboard-title" style={{ textAlign: "center" }}>
          📊 Unit 3 – Assignment Results
        </h1>

        {/* Buttons */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button className="view-btn" onClick={exportToExcel} style={{ marginRight: "15px" }}>
            📘 Export Excel
          </button>

          <button className="view-btn" onClick={exportToPDF}>
            📄 Export PDF
          </button>
        </div>

        {/* Results Table */}
        <table className="styled-table" style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>Accuracy</th>
            </tr>
          </thead>

          <tbody>
            {results.map((item, i) => (
              <tr key={i}>
                <td>{item.studentName}</td>
                <td>{item.rollNumber}</td>
                <td>{item.correct}</td>
                <td>{item.wrong}</td>
                <td>{item.accuracy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
