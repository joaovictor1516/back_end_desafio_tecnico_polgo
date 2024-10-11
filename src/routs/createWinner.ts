import { MongoClient } from "mongodb";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.MONGO_URI;

export async function createWinner(){
    const client = new MongoClient(uri);

    try{
        client.connect();
    } catch(error) {
        console.error(error);
    } finally{
        client.close();
    }
}