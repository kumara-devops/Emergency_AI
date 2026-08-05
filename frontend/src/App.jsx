import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [reports, setReports] = useState([]);
  const [analysis, setAnalysis] = useState("");

  // Send Emergency
  const sendEmergency = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/report",
        {
          type: "Medical Emergency"
        }
      );

      alert(response.data.message);

    } catch (error) {
      alert("Backend is not running!");
      console.log(error);
    }
  };

  // Find Hospital
  const findHospital = () => {
    window.open(
      "https://www.google.com/maps/search/hospitals+near+me",
      "_blank"
    );
  };

  // View Reports
  const getReports = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/reports"
      );

      setReports(response.data);

    } catch (error) {
      alert("Cannot fetch reports");
      console.log(error);
    }
  };

  // AI Analysis
  const analyzeEmergency = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze",
        {
          type: "Medical Emergency"
        }
      );

      setAnalysis(response.data.analysis);

    } catch (error) {
      alert("AI Analysis Failed");
      console.log(error);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "60px"
      }}
    >
      <h1>🚑 Emergency AI Assistant</h1>

      <button onClick={sendEmergency}>
        Send Emergency
      </button>

      <br /><br />

      <button onClick={findHospital}>
        Find Nearby Hospital
      </button>

      <br /><br />

      <button onClick={getReports}>
        View Emergency Reports
      </button>

      <br /><br />

      <button onClick={analyzeEmergency}>
        AI Emergency Analysis
      </button>

      <h2>Emergency Reports</h2>

      <ul>
        {reports.map((report, index) => (
          <li key={index}>
            {report.type}
          </li>
        ))}
      </ul>

      <h2>AI Analysis</h2>

      <pre
        style={{
          background: "#f4f4f4",
          padding: "15px",
          width: "70%",
          margin: "auto",
          textAlign: "left",
          whiteSpace: "pre-wrap",
          borderRadius: "8px"
        }}
      >
        {analysis}
      </pre>
    </div>
  );
}

export default App;
print "successfully report send"