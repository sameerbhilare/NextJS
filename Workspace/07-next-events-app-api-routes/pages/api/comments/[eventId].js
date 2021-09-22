/* 
    Any code we write in here, will never end up in any client side code bundle.
*/

// The default exported function(handler) will receive http request and response objects
// inside this function we can write any server side code.
function handler(req, res) {
  const eventId = req.query.eventId;

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
      return;
    }

    const newComment = { id: new Date().toISOString(), email, name, text };
    console.log(newComment);
    res.status(201).json({ message: 'Added comment', comment: newComment });
    return;
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'Sameer', text: 'First comment!' },
      { id: 'c2', name: 'Max', text: 'Second comment!' },
    ];
    res.status(200).json({ comments: dummyList });
    return;
  }
}

export default handler;
