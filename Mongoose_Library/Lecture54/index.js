import mongoose, { Schema } from 'mongoose'
import express from 'express'
import studentsModel from './Model/studentModel.js';

 await  mongoose.connect("mongodb://localhost:27017/School").then(()=>{
  console.log("___________Connected__________")
 })

const app = express();

app.get('/', async(req, resp)=>{
  const studentData= await studentsModel.find()
  resp.send(studentData)
})

app.listen(2000);




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
