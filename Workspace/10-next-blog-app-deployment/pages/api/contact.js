import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    // validate
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      !name.trim() === '' ||
      !message ||
      !message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid Inputs!' });
      return;
    }

    // store in DB
    const newMessage = { email, name, message };

    // connect
    let client;
    try {
      client = await MongoClient.connect(process.env.mongodb_connection_string);
    } catch (err) {
      res.status(500).json({ message: 'Connecting to DB failed!' });
      return;
    }

    const db = client.db();

    // select collection in which you want to insert document
    try {
      const collections = db.collection('messages');
      // insert document in db
      const result = await collections.insertOne(newMessage);

      newMessage.id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: 'Inserting Data failed!' });
      return;
    }
    // close connection
    client.close();

    res.status(201).json({ message: 'Successfully stored message!', message: newMessage });
  }
}

export default handler;
