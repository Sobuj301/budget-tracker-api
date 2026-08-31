const express = require("express")
const app = express()
require('dotenv').config()
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Budget Tracker with Charts Server")
})


const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-1p9lgli-shard-00-00.udy85xl.mongodb.net:27017,ac-1p9lgli-shard-00-01.udy85xl.mongodb.net:27017,ac-1p9lgli-shard-00-02.udy85xl.mongodb.net:27017/?ssl=true&replicaSet=atlas-ckgurq-shard-0&authSource=admin&appName=Cluster0`

const client = new MongoClient(uri)

async function run() {
    try {
        await client.connect()
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