/*
    API routes allow you to build your own API end points as part of this nextjs project.
    And they will then be served by the same server as your nextjs app.

    To add API routes, you need to add 'api' folder under 'pages' folder.
    Then the NextJS will pick up any JavaScript files stored in there and turn those files into API routes, 
    i.e. end points, that can be targeted by requests and that should receive JSON and return JSON.

    In these API routes we will define functions which contains server-side code 
    because API routes will only run on the server, never on the client.
    The code in them will never be exposed to the client. 
    So we can also use credentials in API routes without compromising them.
    And those functions are then simply triggered whenever a request is sent to this route,
    so e.g. to "/api/new-meetup" for this file.
*/

import { MongoClient } from 'mongodb';

// we can name the handler function anything, we just need to export it as default export
// this handler function receive req and res objects, automatically passed by Nextjs.
const handler = async (req, res) => {
  // POST /api/new-meetup
  if (req.method === 'POST') {
    const data = req.body;

    // connect to mongodb
    const client = await MongoClient.connect('mongodb://localhost:27017/meetups-db');
    const db = client.db();

    // select collection in which you want to insert document
    const meetupCollections = db.collection('meetups');
    // insert document in db
    const result = await meetupCollections.insertOne(data);
    console.log(result);

    // close connection
    client.close();

    // send response to frontend
    res.status(200).json({
      message: 'Meetup Inserted!',
    });
  }
};

export default handler;
