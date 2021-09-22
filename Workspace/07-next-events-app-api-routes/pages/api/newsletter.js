/* 
    Request to ourdomain.com/api/newsletter will reach here.
    Any code we write in here, will never end up in any client side code bundle.
*/
import { MongoClient } from 'mongodb';

async function connectDatabase() {
  // connect to mongodb
  const client = await MongoClient.connect('mongodb://localhost:27017/nextjs-events');
  return client;
}

async function insertDocument(client, document) {
  const db = client.db();

  // select collection in which you want to insert document
  const emailsCollections = db.collection('emails');
  // insert document in db
  const result = await emailsCollections.insertOne(document);
  return result;
}

// The default exported function(handler) will receive http request and response objects
// inside this function we can write any server side code.
async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    // some validation
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid Email Address!' });
      return;
    }

    console.log({ userEmail });

    // connect to mongodb
    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: 'Connecting to DB failed!' });
      return;
    }

    try {
      const result = await insertDocument(client, { email: userEmail });
      // close connection
      client.close();
    } catch (err) {
      res.status(500).json({ message: 'Inserting Data failed!' });
      return;
    }

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
