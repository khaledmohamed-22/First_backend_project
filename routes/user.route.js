const express=require('express');
const UserController =require('../controllers/User.controller')
const { body, validationResult } = require("express-validator");
const verfiyToken= require('../middelware/verifyToken')
const router=express.Router();
const multer  = require('multer')
//FIle uploade
const diskStorage=multer.diskStorage({
destination:function (req,file,cb){
    console.log('File',file);
    cb(null,'uploades')
    
},
filename:function(req,file,cb){
    const ext=file.mimetype.split('/')[1]
    const filename=`user-${Date.now()}.${ext}`
    cb(null,filename)
}
})
const fileFilter=function fileFilter (req, file, cb) {
  const imageType=file.mimetype.split('/')[0]
  if (imageType=='image') {
    return cb(null,true)
  }else{
    return cb('the file should be image ',false)
  }
}
const upload = multer({ storage:diskStorage,
    fileFilter
 })
//getAllUsers
//register
//Login

router
.route('/')
.get(verfiyToken,UserController.getAllusers)

router.route('/register')
.post(upload.single('avatar'),UserController.register)

router.route('/login')
.post(UserController.login)

module.exports = router;