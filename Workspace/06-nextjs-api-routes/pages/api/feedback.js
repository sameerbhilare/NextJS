/* 
    Request to ourdomain.com/api/feedback will reach here.
    Any code we write in here, will never end up in any client side code bundle.
*/
import fs from 'fs'; // nodejs module
import path from 'path'; // nodejs module

// The default exported function(handler) will receive http request and response objects
// inside this function we can write any server side code.
function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    // store
    const filePath = path.join(process.cwd(), 'data', 'feedback.json');
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: 'success', feedback: newFeedback });
  } else {
    res.status(200).json({
      message: 'This works',
    });
  }
}

export default handler;
