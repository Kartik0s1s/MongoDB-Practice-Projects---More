import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import path from "path";
import { fileURLToPath , } from "url";

const app = express();
app.use(express.urlencoded({extended:true}))
const dbName = "School";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
client.connect();

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

  const result = await collection.find().toArray()

  resp.send(result) 
});


app.get("/add", (req, resp)=>{
  resp.render('add-student')
})


app.post("/add-student", async (req, resp) => {
 
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.insertOne(req.body);
  resp.redirect('/')
  console.log(req.body)
});


app.delete("/delete/:id", async(req, resp)=>{
  console.log(req.params.id)
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.deleteOne({_id : new ObjectId(req.params.id)})
   resp.redirect("/")
})

app.get("/delete/:id", async(req, resp)=>{
  console.log(req.params.id)
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.deleteOne({_id : new ObjectId(req.params.id)})
  resp.redirect('/')
})

 

 app.get("/student/:id", async(req, resp) => {
  const id = req.params.id;  
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.findOne({_id : new ObjectId(req.params.id)})
  
  resp.send(result)       
         
});


app.listen(3200, () => {
  console.log("✅ Server running on http://localhost:3200");
});
