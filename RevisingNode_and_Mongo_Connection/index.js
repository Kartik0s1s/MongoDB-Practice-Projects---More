import express from 'express'
import { MongoClient } from 'mongodb'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const dbName = "School"
const url= "mongodb://localhost:27017"

const client = new MongoClient(url);

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

// const __dirname  = path.dirname(__filename)


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


// app.set("view engine", 'ejs')
// app.set("views",path.join(__dirname,"views"))


app.get("/",async(req, resp)=>{
    
   await client.connect();
   const db = client.db(dbName)
   const collection = db.collection("students")

   const result= await collection.find().toArray()

   resp.render('students',{students:result})
   
})

app.listen(3000,()=>{
    console.log("App is Running on 3000")
}) 