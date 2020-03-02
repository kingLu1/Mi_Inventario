import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { app } from "./app";

// Initialize a MongoDB Service Client
const mongoClient = app.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");

// Instantiate a collection handle for todo.items
const Db = mongoClient.db("software");

export { Db };
