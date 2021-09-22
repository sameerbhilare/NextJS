/* 
    Any code we write in here, will never end up in any client side code bundle.
*/
import { MongoClient } from 'mongodb';

// The default exported function(handler) will receive http request and response objects
// inside this function we can write any server side code.
async function handler(req, res) {
  const eventId = req.query.eventId;

  // connect to mongodb
  const client = await MongoClient.connect('mongodb://localhost:27017/nextjs-events');

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    // validation
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      !name.trim() === '' ||
      !text ||
      !text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid Input' });
      return;
    }

    const newComment = { email, name, text, eventId };
    console.log(newComment);

    const db = client.db();

    // select collection in which you want to insert document
    const commentsCollections = db.collection('comments');

    // insert document in db
    const result = await commentsCollections.insertOne(newComment);
    newComment.id = result.insertedId;

    res.status(201).json({ message: 'Added comment', comment: newComment });
    return;
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'Sameer', text: 'First comment!' },
      { id: 'c2', name: 'Max', text: 'Second comment!' },
    ];
    res.status(200).json({ comments: dummyList });
    return;
  }

  // close connection
  client.close();
}

export default handler;
