import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import path from "path";
import { fileURLToPath , } from "url";

const app = express();
app.use(express.urlencoded({extended:true}))
const dbName = "School";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
  await client.connect();

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // ensure Express knows where views are



app.get("/", async (req, resp) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("students");

  const result = await collection.find().toArray();

  resp.render("students", { students: result });
});



app.get("/ui", async (req, resp) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("students");

  const result = await collection.find().toArray();

  resp.send(result)
});


app.get("/add", (req, resp)=>{
  resp.render('add-student')
})


app.post("/add-student", async (req, resp) => {
  resp.send("Data Submitted")
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.insertOne(req.body);
  console.log(req.body)
});


app.delete("/delete/:id", async(req, resp)=>{
  console.log(req.params.id)
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.deleteOne({_id : new ObjectId(req.params.id)})
   if(result){
      resp.send({
               message:"Deleted the student",
               success:"true"
      })
   }else{
      resp.send({
               message:"Deletion failed",
               success:"false"
      })
   }
})

app.get("/delete/:id", async(req, resp)=>{
  console.log(req.params.id)
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.deleteOne({_id : new ObjectId(req.params.id)})
   if(result){
      resp.send("<h1>Student deleted </h1>")
   }else{
      resp.send( "<h1>Student not deleted </h1>")
   }
})


app.get("/student/:id",(req, resp )=>{
 const id = req.params.id
 console.log(id)
 resp.send("Test")
})

app.listen(3200, () => {
  console.log("✅ Server running on http://localhost:3200");
});
