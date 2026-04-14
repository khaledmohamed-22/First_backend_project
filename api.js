require("dotenv").config();
const express = require("express");
const app = express();
const url=process.env.MONGO_URL;
const mongoose=require('mongoose')
const cors=require("cors")
const multer  = require('multer')

const path=require('path')

app.use('/uploades',express.static(path.join(__dirname,'uploades')))

mongoose.connect(url).then(()=>{
console.log("mongo connected succsessfully");
})
//middelware in express

//middleware for enable cors
app.use(cors())

app.use(express.json());

const coursesRouter = require('./routes/courses.route')
const usersRouter=require("./routes/user.route")
app.use('/api/courses', coursesRouter)
app.use('/api/users',usersRouter)

//global middleware for un found routes
app.use((req,res,next)=>{
return res.status(404).json({status:'Error', message:"this resource not available"})

})
app.listen(process.env.PORT, () => {
  console.log("lestning port 4000");
});
 
// app.delete("/api/courses/:courseId", (req, res) => {});
