import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

function handler(req, res) {
  const data = req.body;
  const { email, password } = data;

  if (!email || !email.includes('@') || !password || !password.trim().length() < 7) {
    res.status(422).json({ message: 'Invalid username or password.' });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  // select collection in which you want to insert document
  try {
    const collections = db.collection('users');

    const hashedPassword = hashPassword(password);
    // insert document in db
    const result = await collections.insertOne({ email: email, password: hashedPassword });

    res.status(201).json({ message: 'Created User!' });
  } catch (error) {
    res.status(500).json({ message: 'Inserting Data failed!' });
    return;
  }
  // close connection
  client.close();
}

export default handler;
