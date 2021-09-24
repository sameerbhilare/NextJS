/*
    '_document.js' is a special file and it should be directly under 'pages' folder.
    _document.js allows you to customize the entire HTML document.
    ("_app.js" is the root component (root div inside <body> element ) of Next.js application)
*/
import Document, { Html, Head, Main, NextScript } from 'next/document';

// must be class based component as it needs to extend the special 'Document' component
class MyDocument extends Document {
  render() {
    // return jsx with below special structure
    return (
      <Html lang='en'>
        <Head />
        <body>
          {/* Our NextJS application is in the end rendered by this main component
          so this must be included if we override default _document.js.
          This will render <div id='__next'> ...</div> on html page */}
          <Main />

          <NextScript />

          {/* 'notifications' div added to use React Portals to portal our modals or overlays to this element. */}
          <div id='notifications'></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
