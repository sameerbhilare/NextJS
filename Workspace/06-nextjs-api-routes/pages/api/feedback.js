/* 
    Request to ourdomain.com/api/feedback will reach here.
    Any code we write in here, will never end up in any client side code bundle.
*/

// The default exported function(handler) will receive http request and response objects
// inside this function we can write any server side code.
function handler(req, res) {
  res.status(200).json({
    message: 'This works',
  });
}

export default handler;
