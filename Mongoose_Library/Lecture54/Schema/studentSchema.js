import mongoose from 'mongoose'

 const studentSchema= mongoose.Schema({
 name:String,
    Age: Number,
    Email:String
})

export default studentSchema;