const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const dbName = 'database1';
exports.createUser = async function(data){
    await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');
  const insertResult = await collection.insertOne(data);
  console.log('Inserted documents =>', insertResult);
 
 
  return 'done.';
}