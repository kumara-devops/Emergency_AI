
import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "/api";

function App() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    emergency_type: "Medical Emergency",
    location: "",
    description: "",
  });

  const [reports, setReports] = useState([]);
  const [analysisType, setAnalysisType] = useState("Medical Emergency");
  const [analysis, setAnalysis] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const reportEmergency = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/report`, form);

      setMessage(
        response.data.message || "Emergency report submitted successfully."
      );

      setForm({
        name: "",
        phone: "",
        emergency_type: "Medical Emergency",
        location: "",
        description: "",
      });
    } catch (error) {
      console.error("Report submission failed:", error);
      setMessage(
        "Unable to submit the report. Please check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.get(`${API_URL}/reports`);
      setReports(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Fetching reports failed:", error);
      setMessage("Unable to load reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const analyzeEmergency = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAnalysis("");
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/analyze`, {
        type: analysisType,
      });

      setAnalysis(
        response.data.analysis || "No analysis was returned by the backend."
      );
    } catch (error) {
      console.error("Emergency analysis failed:", error);
      setMessage("Unable to analyze the emergency. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Emergency AI</h1>
        <p>Emergency Reporting and Assistance System</p>
      </header>

      {message && (
        <div className="message" role="status">
          {message}
        </div>
      )}

      <section className="section-card">
        <h2>Report an Emergency</h2>

        <form onSubmit={reportEmergency}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />

          <label htmlFor="emergency_type">Emergency Type</label>
          <select
            id="emergency_type"
            name="emergency_type"
            value={form.emergency_type}
            onChange={handleChange}
          >
            <option value="Medical Emergency">Medical Emergency</option>
            <option value="Fire Emergency">Fire Emergency</option>
            <option value="Accident">Accident</option>
            <option value="Other Emergency">Other Emergency</option>
          </select>

          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter the emergency location"
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the emergency"
            rows="4"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Submit Emergency"}
          </button>
        </form>
      </section>

      <section className="section-card">
        <h2>Emergency AI Assistance</h2>

        <form onSubmit={analyzeEmergency}>
          <label htmlFor="analysisType">Select Emergency Type</label>
          <select
            id="analysisType"
            value={analysisType}
            onChange={(event) => setAnalysisType(event.target.value)}
          >
            <option value="Medical Emergency">Medical Emergency</option>
            <option value="Fire Emergency">Fire Emergency</option>
            <option value="Accident">Accident</option>
            <option value="Other Emergency">Other Emergency</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Emergency"}
          </button>
        </form>

        {analysis && (
          <div className="analysis-result">
            <h3>Emergency Analysis</h3>
            <pre>{analysis}</pre>
            <p>
              This is general guidance, not a substitute for professional
              emergency services. For immediate danger, contact local emergency
              services.
            </p>
          </div>
        )}
      </section>

      <section className="section-card">
        <h2>Emergency Reports</h2>

        <button type="button" onClick={getReports} disabled={loading}>
          {loading ? "Loading..." : "View All Reports"}
        </button>

        {reports.length > 0 ? (
          <div className="reports-list">
            {reports.map((report, index) => (
              <article className="report-item" key={index}>
                <h3>Report {index + 1}</h3>
                <p>
                  <strong>Name:</strong> {report.name || "Not provided"}
                </p>
                <p>
                  <strong>Phone:</strong> {report.phone || "Not provided"}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {report.emergency_type || report.type || "Not provided"}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {report.location || "Not provided"}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {report.description || "Not provided"}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p>No reports loaded. Select "View All Reports" to check.</p>
        )}
      </section>

      <footer className="app-footer">
        <p>Emergency AI Project</p>
      </footer>
    </main>
  );
}

export default App;
