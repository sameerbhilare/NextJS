import Head from 'next/head';
import Layout from '../components/layout/layout';
import { NotificationContextProvider } from '../store/notification-context';
import '../styles/globals.css';

/*
  "_app.js" is the root component (root div inside <body> element ) of Next.js application.
  Nextjs passes the Component and pageProps props to this root component.
  'Component' is a prop that holds the actual page contents that should be rendered.
  So it will be different whenever we switch a page and 
  'pageProps' are specific props our pages might be getting.

  So 'Component here in this _app.js file will in the end be the actual page content of our different pages.
  And it will change whenever we navigate from page A to page B.

  So whenever you have some component or some setting that affects all your pages e.g. layout,
  you can utilize this _app.js file to easily add that without diving into dozens of files individually.
*/
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        {/*  Next.js injects the content which we add between these 'Head' tags 
           into the real 'head' part of the rendered page.
           Adding common head related information.
           In case of conflict, the more specific page head information takes preference. */}
        <Head>
          <title>Next Events</title>
          <meta name='description' content='NextJS Events' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
