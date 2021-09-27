import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

// execute (which returns a handler function) and export
// configure next-auth behavior
export default NextAuth({
  // configure how that session for an authenticated user will be managed
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },

  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const db = client.db();
        const collections = db.collection('users');
        const user = await collections.findOne({ email: credentials.email });
        client.close();

        if (!user) {
          throw new Error('No user found!');
        }

        //verify password
        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        // valid user
        // whatever returned from here will be encoded in JWT
        return {
          email: user.email,
        };
      },
    }),
  ],
});
