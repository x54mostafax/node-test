const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
// const Router = require("./router/routeApi");
const app = express();
const port = 5001;
const url =
  "mongodb+srv://x54Mostafa:sin45=cos45@formgumball.6aleqde.mongodb.net/?retryWrites=true&w=majority";

const cleint = new mongodb.MongoClient(url);

// mongoose.connect(url).then(res => {
//   console.log("Good Databases");
//   app.listen(5000, () => {
//     console.log("I am listining from my server");
//   });
// });
const main = async () => {
  await cleint.connect();
  console.log("connect is succes");
  const db = cleint.db("test");
  const collection = db.collection("articles");
  const data = await collection.find().toArray();
  console.log("data", data);
};
main();
