const fs = require('node:fs');
const { json } = require('node:stream/consumers');

//read
// const { json } = require('node:stream/consumers');
// const readfile=fs.readFileSync('./test.txt','utf8') 
// console.log("content ==>",readfile);

//write file
// const writeFile= fs.writeFile('./user.json',JSON.stringify([{id:1,title:"khaled"}]),'utf8',(err)=>{
// if(err){
//     console.log("Error to write");
    
// }
// console.log(
//     "done"
// );


// })

//delete
// const file=fs.unlink('./user.json',(err)=>{
// if (err){
//     console.log(err);
    
// }
// console.log("done");

// })
//streams [readable-writeable]
