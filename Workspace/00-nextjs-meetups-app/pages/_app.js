import Layout from '../components/layout/Layout';
import '../styles/globals.css';

/*
  "_app.js" is the root component of Next.js application.
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
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
