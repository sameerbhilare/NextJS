import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  // connect
  let client;
  try {
    client = await MongoClient.connect(process.env.mongodb_connection_string);
  } catch (err) {
    res.status(500).json({ message: 'Connecting to DB failed!' });
    return;
  }

  return client;
}
