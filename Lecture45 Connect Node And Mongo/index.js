import express from 'express'
import { MongoClient } from 'mongodb';
 
const dbName="School"
const url = "mongodb://localhost:27017"



const client = new MongoClient(url);

async function dbConnection(){
    await client.connect()
    const db =client.db(dbName);
    const collection =db.collection('students')
    

    const result = await collection.find().toArray()
    console.log(result)
}


dbConnection();

const app= express();
app.listen(4800);

