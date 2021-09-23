/* 
    Any code we write in here, will never end up in any client side code bundle.
*/
import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-utils';

// The default exported function(handler) will receive http request and response objects
// inside this function we can write any server side code.
async function handler(req, res) {
  const eventId = req.query.eventId;

  // connect to mongodb
  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: 'Connecting to DB failed!' });
    return;
  }

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
      // close connection
      client.close();
      return;
    }

    const newComment = { email, name, text, eventId };

    const db = client.db();

    // select collection in which you want to insert document
    const commentsCollections = db.collection('comments');

    // insert document in db
    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment', comment: newComment });
    } catch (err) {
      res.status(500).json({ message: 'Inserting Data failed!' });
    }
  }

  if (req.method === 'GET') {
    const db = client.db();

    // select collection in which you want to find documents
    // find() returns a cursor, so we need to use toArray()
    let allComments;
    try {
      allComments = await getAllDocuments(client, 'comments', { eventId: eventId }, { _id: -1 });

      res.status(200).json({ comments: allComments });
      return;
    } catch (error) {
      res.status(500).json({ message: 'Getting Comments failed!' });
    }
  }

  // close connection
  client.close();
}

export default handler;
