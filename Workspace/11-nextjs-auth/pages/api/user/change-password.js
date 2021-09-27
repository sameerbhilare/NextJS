import { getSession } from 'next-auth/client';

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
}

export default handler;
