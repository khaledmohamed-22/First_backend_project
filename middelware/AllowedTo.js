
module.exports=(...roles)=>{

return (req,res,next)=>{


  console.log(req.currntUser);

if (!roles.includes(req.currntUser.role) ) {
    res.status(401).json("not allow to delete for this role")
}else{
    next();
}




}


}