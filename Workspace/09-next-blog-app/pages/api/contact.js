function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    // validate
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      !name.trim() === '' ||
      !message ||
      !message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid Inputs!' });
      return;
    }

    // store in DB
    const newMessage = { email, name, message };

    res.status(201).json({ message: 'Successfully stored message!', message: newMessage });
  }
}

export default handler;
