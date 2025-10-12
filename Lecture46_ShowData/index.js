 import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const dbName = "School";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

// Setup __dirname (since you’re using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine and views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, resp) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("students");

    const students = await collection.find().toArray();

    // Render EJS and pass data
    resp.render("students", { students });
    console.log(students)
  } catch (err) {
    console.error(err);
    resp.status(500).send("Error fetching students");
  }
});

app.listen(3200, () => {
  console.log("Server running on http://localhost:3200");
});
