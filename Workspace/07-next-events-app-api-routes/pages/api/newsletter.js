/* 
    Request to ourdomain.com/api/newsletter will reach here.
    Any code we write in here, will never end up in any client side code bundle.
*/

// The default exported function(handler) will receive http request and response objects
// inside this function we can write any server side code.
function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    // some validation
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid Email Address!' });
      return;
    }

    console.log({ userEmail });
    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
