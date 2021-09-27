const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  // during development
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_connection_string: 'mongodb://localhost:27017/nextjs-auth',
      },
    };
  }

  // FOR PROD
  return {
    env: {
      mongodb_connection_string:
        'mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.zdoxp.mongodb.net/<DB_NAME>?retryWrites=true&w=majority',

      // for prod, we must set 'NEXTAUTH_URL' url to your domain name so that next-auth will take care of few things behnd the scenes
      NEXTAUTH_URL: 'https://nextjs-blog-b386wno1j-sameerbhilare.vercel.app',
    },
  };
};
