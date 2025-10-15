import mongoose, { Schema } from 'mongoose'
async function dbConnection() {
  await  mongoose.connect("mongodb://localhost:27017/School")
  const studentSchema= new Schema({
    name:String,
    Age: Number,
    Email:String
  })


const studentsModel= mongoose.model('student',studentSchema)
const result = await studentsModel.find()
console.log(result)
}

dbConnection()
