import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.urlencoded({ extended: true }));
const dbName = "School";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
client.connect();
const db = client.db(dbName);
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

  resp.send(result);
});

app.get("/add", (req, resp) => {
  resp.render("add-student");
});

app.post("/add-student", async (req, resp) => {
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.insertOne(req.body);
  resp.redirect("/");
});

app.delete("/delete/:id", async (req, resp) => {
  console.log(req.params.id);
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  resp.redirect("/");
});

app.get("/delete/:id", async (req, resp) => {
  console.log(req.params.id);
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  resp.redirect("/");
});


//Update Get request u will go to update-student.ejs file
app.get("/update/:id", async (req, resp) => {
  const id = req.params.id;
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.findOne({ _id: new ObjectId(req.params.id) });

  resp.render("update-student", { result });
});



// U r redirected here from update-student.ejs
 app.post('/update-student/:id', async (req, resp) => {
  const db = client.db(dbName);
  const collection = db.collection("students");

  const filter = { _id: new ObjectId(req.params.id) };
  const update = { $set: req.body };

  const result = await collection.updateOne(filter, update);

  resp.redirect('/');
});
 


app.listen(3200, () => {
  console.log("✅ Server running on http://localhost:3200");
});
