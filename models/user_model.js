const mongoose=require("mongoose");
const userRoles=require('../utisl/System.roles')
const validator=require('validator')
const userSchema=new mongoose.Schema({
firstName:{

type:String,

required:true,

},
lastName:{

type:String,
required:true,

},

Email:{

    type :String,
    required:true,
    unique:true,
    validate:[validator.isEmail,"please enter valid email"]
},
password:{
type:String,
required:true,

},
token:{

    type:String,
},

role:{

type:String,
enum:[userRoles.ADMIN,userRoles.MANAGER,userRoles.USER],
default:userRoles.USER,

},
avatar:{
type:String,
default:'uploades/profile.jpg'


}





})

module.exports=mongoose.model('user',userSchema);