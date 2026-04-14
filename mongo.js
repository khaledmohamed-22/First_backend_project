// const { MongoClient } = require("mongodb");

// const url =
//   "mongodb+srv://khaled:khaled@cluster0.rtbbpow.mongodb.net/?appName=Cluster0";

// const client = new MongoClient(url);
// async function main() {
//   //connect to database
//   await client.connect();
//   console.log("connected successfully to server");
//   //choose the databseName to connect with
//   const db = client.db("khaledDB");
//   //choose the collection
//   const collection = db.collection("courses");
//   //store data in varible and get it to print  (Get Query)
//   const data = await collection.find().toArray();
//   console.log("data", data);
// }
// main();
