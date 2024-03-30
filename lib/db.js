
import { MongoClient } from "mongodb";
const { ObjectId } = require("mongodb");

let cachedClient = null;
let clientSet = false;

export async function connectToDatabase() {
  if (clientSet) {
    console.log("return already stored client");
    return cachedClient;
  }

  let client;

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.t7b34om.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;


  
try {
    client = await MongoClient.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      connectTimeoutMS: 300000,
      poolSize: 10, // Adjust this based on your application's needs
    });
  } catch (error) {
    // console.error("Error connecting to the database:", error);
    console.error(
      `[${new Date().toISOString()}] Error connecting to the database:`,
      error
    );

    // If the error is related to a closed topology, attempt to reconnect
    cachedClient = null;

    if (error.message === "Topology is closed, please connect") {
      console.log("Topology is closed. Reconnecting...");
      connectToDatabase();
      return; // Stop executing the function since a reconnection attempt is already in progress
    }
  }

  // Handle the 'close' event for potential reconnection
  

    client.on("close", () => {
      console.log("Connection closed. Reconnecting...");
      connectToDatabase(); // Initiate reconnection on close event
    });
  

  
  if (!clientSet) {
    cachedClient = client;
    clientSet = true;
    console.log("return new client");
    
  }

  return client;
}

export async function getAllPosts() {
  const client = await connectToDatabase();
  const db = client.db();

  const data = await db.collection("PostedItem").find({}).toArray();

  return data;
}

export async function getPostDataById(id) {
  const client = await connectToDatabase();
  const usersCollection = client.db().collection("PostedItem");
  const postobjectId = new ObjectId(id);

  const user = await usersCollection.findOne({
    _id: postobjectId,
  });

  return user;
}

export async function getResponseDataById(id) {
  const client = await connectToDatabase();

  const usersCollection = client.db().collection("QAnswers");

  const user = await usersCollection
    .find({
      PostID: id,
    })
    .toArray();
  return user;
}

export async function fetchallemails() {
  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const allemails = await usersCollection
    .find({}, { projection: { password: 0, name: 0, _id: 0 } })
    .toArray();

  return allemails;
}
