const express = require("express");
const { body, validationResult } = require("express-validator");
const controller = require("../controllers/courses.controller");
const verfiyToken = require("../middelware/verifyToken");
const Allowedto = require("../middelware/Allowedto");
const userroles=require('../utisl/System.roles')
const router = express.Router();
router
  .route("/")
  .get(controller.getAllcourses)

  .post(
    body("title").notEmpty().withMessage("title is required"),
    controller.addcourse,
  );

router
  .route("/:courseId")
  .delete(verfiyToken,Allowedto(userroles.ADMIN,userroles.MANAGER),controller.deletecourse)

  .get(controller.getcoursebyId)
  .patch(controller.updatecourse);

module.exports = router;
