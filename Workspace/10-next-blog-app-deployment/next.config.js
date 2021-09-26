const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  // during development
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_connection_string: 'mongodb://localhost:27017/nextjs-blog',
      },
    };
  }

  // for prod
  return {
    env: {
      mongodb_connection_string:
        'mongodb+srv://nextjs-user:YroHp4vUyBXhtQSq@cluster0.zdoxp.mongodb.net/nextjs-blog?retryWrites=true&w=majority',
    },
  };
};
