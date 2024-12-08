const express = require("express");
const router = express.Router();
const Class = require("../models/class");
const Attendance = require("../models/attendence");

// Fetch attendance records for a specific student in a class
router.get("/:classId/student/:studentId", async (req, res) => {
  const { classId, studentId } = req.params;

  try {
    const classData = await Class.findById(classId).populate(
      "teacherId",
      "username email"
    );

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    const isStudentInClass = classData.students.some(
      (student) => student._id.toString() === studentId
    );

    if (!isStudentInClass) {
      return res.status(403).json({ message: "Access denied" });
    }

    const attendanceRecords = await Attendance.find({
      classId,
      studentId,
    });

    res.status(200).json({ attendanceRecords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update attendance records for a specific student in a class
router.put("/:classId/student/:studentId", async (req, res) => {
  const { classId, studentId } = req.params;
  const { date, status } = req.body;

  try {
    const classData = await Class.findById(classId).populate(
      "teacherId",
      "username email"
    );

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    const isStudentInClass = classData.students.some(
      (student) => student._id.toString() === studentId
    );

    if (!isStudentInClass) {
      return res.status(403).json({ message: "Access denied" });
    }

    const attendanceRecord = await Attendance.findOneAndUpdate(
      { classId, studentId, date },
      { status },
      { new: true, upsert: true }
    );

    res.status(200).json(attendanceRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
