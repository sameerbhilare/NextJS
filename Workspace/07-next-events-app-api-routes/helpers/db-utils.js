import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  // connect to mongodb
  const client = await MongoClient.connect('mongodb://localhost:27017/nextjs-events');
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  // select collection in which you want to insert document
  const collections = db.collection(collection);
  // insert document in db
  const result = collections.insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, filter, sort) {
  const db = client.db();

  const allComments = await db.collection(collection).find(filter).sort(sort).toArray();

  return allComments;
}
