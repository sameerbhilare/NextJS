/* 
    Request to ourdomain.com/api/newsletter will reach here.
    Any code we write in here, will never end up in any client side code bundle.
*/
import { connectDatabase, insertDocument } from '../../helpers/db-utils';

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
      const result = await insertDocument(client, 'emails', { email: userEmail });
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
