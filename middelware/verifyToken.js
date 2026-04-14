const jwt = require("jsonwebtoken");
const httpTextMessage=require('../utisl/httpTextMessage');
require("dotenv").config();

 const verfiyToken=async(req,res,next)=>{
const authHeader= req.headers['Authorization'] || req.headers['authorization'];
const token=authHeader.split(' ')[1];

if (!authHeader) {
    return res.status(401).json({status:httpTextMessage.FAIL,message:" token is required"});
}
try{
const currntUser=jwt.verify(token,process
    .env.SECRET_KEY
    
)
 

req.currntUser=currntUser;

next();



}catch(err){
return res.status(401).json({status:httpTextMessage.ERROR,message:"invalid token"});
}






}

module.exports=verfiyToken;