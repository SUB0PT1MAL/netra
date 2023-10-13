const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const mongoUrl = 'mongodb://192.168.1.111:27017'; 

app.use(express.json());

app.post('/api/search', async (req, res) => {
  const { extraTerm, accountTerm, passwordTerm } = req.body;

  const client = await MongoClient.connect(mongoUrl);
  const db = client.db('mydatabase');

  const results = await db.collection('users').find({
    $or: [
      { extra: { $regex: extraTerm } },
      { account: { $regex: accountTerm } },
      { password: { $regex: passwordTerm } } 
    ]
  }).toArray();

  client.close();

  res.json(results);
});

app.listen(3000);