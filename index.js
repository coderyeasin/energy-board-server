const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000

//Middleware
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('energy statistics')
})

//Database Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tie3l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//RESTFul API
async function server() {
    try {

        await client.connect()
        
        const database = client.db('statistics')
        const energyCollection = database.collection('country_status')

        //GET API
        app.get('/country_status', async (req, res) => {
            const result = await energyCollection.find({}).toArray()
            res.send(result)
        })
    }
    finally {
        // await client.close()
    }
}
server().catch(console.dir)




app.listen(port, () => {
  console.log(`Energy Board Listening:${port}`)
})