import mongoose from "mongoose";
import studentSchema from "../Schema/studentSchema.js";

const studentsModel = mongoose.model("students", studentSchema);

export default studentsModel;