import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req });

  // to protect our API routes from unauthenticated requests
  if (!session) {
    res.status(401).json({ message: 'Not Authenticated!' });
    return;
  }

  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;

  const client = await connectToDatabase();
  const db = client.db();
  const userCollection = db.collection('users');
  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    client.close();
    res.status(404).json({ message: 'User Not Found!' });
    return;
  }

  const currentPassword = user.password;
  const isValid = await verifyPassword(oldPassword, currentPassword);
  if (!isValid) {
    client.close();
    res.status(403).json({ message: 'Invalid Password!' });
    return;
  }

  console.log({ oldPassword, newPassword });
  const hashedPassword = await hashPassword(newPassword);
  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();

  res.status(200).json({ message: 'Password updated!' });
}

export default handler;
