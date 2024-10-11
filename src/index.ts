import { MongoClient } from "mongodb";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors);
app.use(express.json());

dotenv.config();
const port = process.env.PORT;

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function server(){
    try{
        await client.connect();

        
    }
}