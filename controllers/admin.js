const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select(
      "username _id email firstName lastName"
    );
    const students = await User.find({ role: "student" }).select(
      "username _id email firstName lastName"
    );
    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No Student found" });
    }

    if (!teachers || teachers.length === 0) {
      return res.status(404).json({ message: "No teachers found" });
    }
    res.json({ teachers, students });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/teacher", async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select(
      "username _id email firstName lastName"
    );
    if (!teachers || teachers.length === 0) {
      return res.status(404).json({ message: "No teachers found" });
    }
    res.json(teachers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/student", async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select(
      "username _id email firstName lastName"
    );
    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No Student found" });
    }
    res.json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
