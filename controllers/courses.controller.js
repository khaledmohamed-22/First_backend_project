let course = require("../models/mongoose.model");
const { validationResult, query } = require("express-validator");

const httptextmessage = require("../utisl/httpTextMessage");
//GETAll
const getAllcourses = async (req, res) => {
  const query = req.query;
  const limit = query.limit;
  const page = query.page;
  const skip = (page - 1) * limit;
  const courses = await course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httptextmessage.SUCCESS, data: { courses } }); //Jsend structure
};
//GETBYID
const getcoursebyId = async (req, res) => {
  const coursebyid = await course.findById(req.params.courseId);
  res.json({ status: httptextmessage.SUCCESS, data: { course: coursebyid } });
};

//ADD COURSE
const addcourse = (req, res) => {
  const err = validationResult(req);
  console.log(req.body);
  if (!err.isEmpty()) {
    return res
      .status(404)
      .json({ status: httptextmessage.FAIL, message: "the body is empty" });
  }
  const newcourse = new course(req.body);
  newcourse.save();
  res.status(201).json({ status: httptextmessage.SUCCESS, course: newcourse });
};
//Update Course
const updatecourse = async (req, res) => {
  const courseId = req.params.courseId;

  const updatedCourse = await course.updateOne(
    { _id: courseId },
    { $set: { ...req.body } },
  );
  console.log(updatedCourse);

  return res
    .status(200)
    .json({ status: httptextmessage.SUCCESS, course: updatedCourse });
};

//delete course
const deletecourse = async (req, res) => {
  const deletedcourse = await course.findByIdAndDelete(req.params.courseId);
  res.json({ status: httptextmessage.SUCCESS, data: null });
};

module.exports = {
  getAllcourses,
  getcoursebyId,
  addcourse,
  updatecourse,
  deletecourse,
};
