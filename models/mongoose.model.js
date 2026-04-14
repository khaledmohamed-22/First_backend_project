const mongoose=require("mongoose")


const courseSchema=new mongoose.Schema({
name:{
    type: String
},
title:{

    type: String,
    required:true

},
price:{
    type:Number
}
})

module.exports= mongoose.model('course',courseSchema)