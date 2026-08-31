const express = require("express")
const cors = require("cors")
const app = express()
require('dotenv').config()
const { MongoClient, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000


app.use(express.json())


app.get("/", (req, res) => {
    res.send("Budget Tracker with Charts Server")
})


const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-1p9lgli-shard-00-00.udy85xl.mongodb.net:27017,ac-1p9lgli-shard-00-01.udy85xl.mongodb.net:27017,ac-1p9lgli-shard-00-02.udy85xl.mongodb.net:27017/?ssl=true&replicaSet=atlas-ckgurq-shard-0&authSource=admin&appName=Cluster0`

const client = new MongoClient(uri)

async function run() {
    try {
        await client.connect()
         
        const expenseCollection = client.db("expenseDB").collection("expenses")

        app.post("/expenses",async(req,res) =>{
            const expenses = req.body;
            const result = await expenseCollection.insertOne(expenses)
            res.send(result)
        })

        app.get("/expenses",async(req,res) =>{
            const userId = req.query?.userId;
             const category = req?.query?.category;
             const query = {userId:userId}
             if(category){
                query.category = category
             }
             const result = await expenseCollection.find(query).toArray()
             res.send(result)
        })

        app.delete("/expenses/:id",async(req,res) =>{
            const id = req.params.id;
            const query = {_id : new ObjectId(id)}
            const result = await expenseCollection.deleteOne(query)
            res.send(result)
        })
        

        console.log("You successfully connected to MongoDB!");
    }
    catch(error){
      console.log(error)
    }
}


run()


app.listen(port, () => {
    console.log(`Budget Tracker with Charts Running ${port}`)
})

module.exports = app;