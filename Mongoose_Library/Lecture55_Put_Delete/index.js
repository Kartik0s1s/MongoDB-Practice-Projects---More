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
  } else {
    const studentData = await studentsModel.create(req.body);
    resp.send({
      Message: "Data Saved",
      Success: true,
      Saved_Info: studentData,
    });
  }
});


app.put("/update/:id", async(req, resp)=>{
  const id = req.params.id;
  console.log(req.params.id)

  const studentData= await studentsModel.findByIdAndUpdate(id,{
    ...req.body
  })
  resp.send({
      Message: "Data Saved",
      Success: true,
      Saved_Info: studentData,
    });

})

app.delete("/delete/:id", async(req, resp)=>{
  const id = req.params.id;
  console.log(req.params.id)

  const studentData= await studentsModel.findByIdAndDelete(id,{
    ...req.body
  })
  resp.send({
      Message: "Data Deleted",
      Success: true,
      Saved_Info: studentData,
    });

})


app.listen(3000);

 