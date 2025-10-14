import express from "express";
import { MongoClient } from "mongodb";
 

const app = express();
app.use(express.json());
const dbName = "School";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

app.post("/add-student-api", async (req, resp)=>{

   const {name, Age, Email}= req.body;
   if ( !name || !Age || !Email){
    resp.send({message:"All feilds require", Seccess:"false"})
    return false;
   }
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.insertOne(req.body);
  resp.send({"message":result})
  console.log(req.body)
})


app.listen(3200, () => {
  console.log("✅ Server running on http://localhost:3200");
});
