import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();
const port = process.env.PORT;

const uri = process.env.MONGO_URI;
const dbName = "back-end-polgo-tecnic-challenge";

if(uri){
    const client = new MongoClient(uri);
    async function server(){
        try{
            await client.connect();
            console.log("my data base is connected");
            
            const db = client.db(dbName);
            const winnersCollection = db.collection("winners");

            app.get("/winners", async (request, response) => {
                try{
                    const winners = await winnersCollection.find({}).toArray();
                    response.status(200).json(winners);
                } catch(error){
                    console.error(error);
                    response.status(500).json({error});
                }
            });

            app.post("/winners", async (request, response) => {
                const {name, price, date} = request.body;

                !name || !price || !date && response.status(400).json({message: "Required data"});

                const newWinner = {name, price, date};

                try{
                    const result = await winnersCollection.insertOne(newWinner);
                    response.status(200).json({message: "Successfully registered winner", winner: result})
                } catch(error){
                    console.error(error);
                    response.status(500).json({error});
                }
            });

            app.delete("/winner/:id", async (request, response) => {
                const id = request.params.id;

                try{
                    const result = await winnersCollection.deleteOne({id: new ObjectId(id)});

                    result.deletedCount === 1 ? response.status(200).json({message: "Winner was deleted."}) : response.status(400).json({message: "Winner wasent founded"});
                } catch(error){
                    console.error(error);
                    response.status(500).json({error})
                }
            })

            app.listen(port, () => {
                console.log(`Back-end rodando em http://localhos:${port}`);
            });
        } catch(error){
            console.error(error);
        }
    }

    server().catch(console.error);
}