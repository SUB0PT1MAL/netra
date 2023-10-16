const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const mongoHost = process.env.MONGO_HOST || "localhost";
const dbName = process.env.MONGO_DB_NAME || "your_database_name";
const collectionName = process.env.MONGO_COLLECTION_NAME || "your_collection_name";

const url = `mongodb://${mongoHost}:27017/${dbName}`;

app.use(express.static("public"));

app.get("/search", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const user = req.query.user;
        const domain = req.query.domain;

        const query = {};
        if (user) query.user = user;
        if (domain) query.domain = domain;

        collection.find(query).toArray((err, result) => {
            if (err) throw err;
            res.json(result);
            client.close();
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
