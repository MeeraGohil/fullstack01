import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const resumeRef = useRef();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: "",
    skills: "",
    objective: "",
    experience: "",
    achievements: ""
  });

  const [resumes, setResumes] = useState([]);

  // Handle input
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  // Download PDF
  const downloadPDF = () => {
    html2canvas(resumeRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("resume.pdf");
    });
  };

  // Save Resume (FIXED VERSION)
  const saveResume = async () => {
    try {
      const res = await fetch("http://localhost:5001/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      await res.json();

      // refresh list properly
      const updated = await fetch("http://localhost:5001/resumes");
      const newData = await updated.json();
      setResumes(newData);

      // clear form (optional but good)
      setData({
        name: "",
        email: "",
        phone: "",
        summary: "",
        education: "",
        skills: "",
        objective: "",
        experience: "",
        achievements: ""
      });

    } catch (err) {
      console.error(err);
    }
  };

  // Fetch resumes
  const fetchResumes = async () => {
    const res = await fetch("http://localhost:5001/resumes");
    const result = await res.json();
    setResumes(result);
  };

  // Load on start
  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div style={styles.container}>

      {/* FORM */}
      <div style={styles.form}>
        <h2>Resume Builder</h2>

        {Object.keys(data).map((key) => (
          <input
            key={key}
            name={key}
            value={data[key]}   // 🔥 important fix
            placeholder={key.toUpperCase()}
            onChange={handleChange}
            style={styles.input}
          />
        ))}

        <button onClick={downloadPDF} style={styles.button}>
          Download Resume
        </button>

        <button onClick={saveResume} style={styles.button}>
          Save Resume
        </button>
      </div>

      {/* PREVIEW */}
      <div style={styles.preview} ref={resumeRef}>
        <h1>{data.name}</h1>
        <p>{data.email} | {data.phone}</p>

        <hr />

        {renderSection("Professional Summary", data.summary)}
        {renderSection("Career Objective", data.objective)}
        {renderSection("Education", data.education)}
        {renderSection("Skills", data.skills)}
        {renderSection("Experience", data.experience)}
        {renderSection("Achievements", data.achievements)}
      </div>

      {/* SAVED RESUMES */}
      <div style={styles.saved}>
        <h2>Saved Resumes</h2>

        {resumes.map((r, i) => (
          <div key={i} style={styles.card}>
            <p><b>{r.name}</b></p>
            <p>{r.email}</p>
            <p>{r.phone}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

// Section renderer
const renderSection = (title, content) => {
  if (!content) return null;
  return (
    <div style={{ marginBottom: "15px" }}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    background: "#f0f2f5",
    minHeight: "100vh"
  },
  form: {
    width: "30%",
    background: "white",
    padding: "15px",
    borderRadius: "10px"
  },
  preview: {
    width: "40%",
    background: "white",
    padding: "20px",
    borderRadius: "10px"
  },
  saved: {
    width: "30%",
    background: "white",
    padding: "15px",
    borderRadius: "10px"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    width: "100%",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px"
  },
  card: {
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px"
  }
};

export default App;