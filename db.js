const { MongoClient } = require("mongodb");
const connectionString = "mongodb://localhost:27017/books";

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports={
    connectToServer:  (callback)=> {
        client.connect(function (err, db){
            if (err || !db) {
                return callback(err);
            }
            dbConnection = db.db("sample_airbnb");
            console.log("connected to db");
            return callback;
        })
    },
    getDb: function () {
        return dbConnection;
    }
}