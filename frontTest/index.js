fetch("http://localhost:4000/api/courses")
.then((res)=>res.json())
.then((res)=>{
console.log(res.data.courses);

})