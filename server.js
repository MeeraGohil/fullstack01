const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// ROOT
app.get("/", (req, res) => {
  res.send("API is working");
});

/* =========================
   STUDENT CRUD (optional)
========================= */

let students = [];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// POST (add student)
app.post("/students", (req, res) => {
  students.push(req.body);
  res.json({ message: "Student added", student: req.body });
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  const id = req.params.id;
  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted" });
});

// UPDATE student
app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const updated = req.body;

  students = students.map(s =>
    s.id === id ? updated : s
  );

  res.json({ message: "Student updated" });
});


/* =========================
   RESUME CRUD (MAIN PART)
========================= */

let resumes = [];

// GET all resumes
app.get("/resumes", (req, res) => {
  res.json(resumes);
});

// POST (add resume)
app.post("/resumes", (req, res) => {
  resumes.push(req.body);
  res.json({ message: "Resume saved", data: req.body });
});

// DELETE resume
app.delete("/resumes/:email", (req, res) => {
  const email = req.params.email;
  resumes = resumes.filter(r => r.email !== email);
  res.json({ message: "Resume deleted" });
});

// UPDATE resume
app.put("/resumes/:email", (req, res) => {
  const email = req.params.email;
  const updated = req.body;

  resumes = resumes.map(r =>
    r.email === email ? updated : r
  );

  res.json({ message: "Resume updated" });
});


/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});