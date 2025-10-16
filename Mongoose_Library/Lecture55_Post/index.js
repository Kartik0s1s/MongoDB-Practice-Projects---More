import mongoose, { Schema } from "mongoose";
import express from "express";
import studentsModel from "./Model/studentModel.js";

await mongoose.connect("mongodb://localhost:27017/School").then(() => {
  console.log("___________Connected__________");
});

const app = express();
app.use(express.json());

app.get("/", async (req, resp) => {
  const studentData = await studentsModel.find();
  resp.send(studentData);
});

app.post("/save", async (req, resp) => {
  console.log(req.body);
  const { name, Age, Email } = req.body;
  if (!name || !Age || !Email) {
    resp.send({
      Message: "Cannot Save Data",
      Success: false,
    }); 
     return false;
  
  }else{
  const studentData = await studentsModel.create(req.body);
  resp.send({
    Message: "Data Saved",
    Success: true,
    Saved_Info: studentData,
  });
}
});

app.listen(3000);

// async function dbConnection() {
//   await  mongoose.connect("mongodb://localhost:27017/School")
//   const studentSchema= new Schema({
//     name:String,
//     Age: Number,
//     Email:String
//   })

// const studentsModel= mongoose.model('student',studentSchema)
// const result = await studentsModel.find()
// console.log(result)
// }

// dbConnection()
