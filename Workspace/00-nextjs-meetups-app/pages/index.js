// This file will be served when request reaches ourdomain.com/
// the name 'index.js' is a special name.

import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

/*
  IMPORTANT -
  When you import something in a 'page' component file and that something is 
  then only used in getServerSideProps or getStaticProps, 
  then the imported package will NOT be part of the client side bundle.

  So you can import both server side and clients side code here, and depending on where you use it,
  it will be included in different bundles which are independent from each other.
  That's a nice, smart feature built into nextJS.
*/
import { MongoClient } from 'mongodb';

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 5, 12345 Some City',
//     description: 'This is a first meetup!',
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 10, 12345 Some City',
//     description: 'This is a second meetup!',
//   },
// ];

const HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  /* 
  IMPORTANT - 
  Here useEffect will execute the function after this HomePage component is loaded.
  So for the first render cycle (which will be server side pre-rendered page) the loadedMeetups will be empty.
  And those are fetched only in the 2nd render cycle as part of useEffect function execution.
  So if you see the html page source, you will not see the loadedMeetups 
  as those are fetched only after the component is rendered in the browser.

  From SEO point of view, this is a problem.
  SOLUTION is to use getStaticProps() - data fetching for pre-rendering
  */
  /*
  useEffect(() => {
    // send http request and load data
    setLoadedMeetups(DUMMY_MEETUPS);
  }, []);
  */

  return (
    <>
      {/* 'Head' component from next/head allows you to add Head elements to the Head section of your page.
      All the HTML elements which you can add in the Head section, you can add them between <Head></Head>. */}
      <Head>
        <title>React Meetups</title>
        {/* this text for 'description' will be shown by search engines */}
        <meta name='description' content='Browse a huge list of highly active React meetups!' />
      </Head>
      <MeetupList meetups={props.meetups || []} />
    </>
  );
};

/*
    By default, NextJS generates your pages already statically during the build process
    but if you need to add data fetching to a page component, 
    you can do so by exporting a special function called 'getStaticProps' from inside your page component file.
    This now only works in your page component files, not in other component files.

    NextJS will look for a function with name getStaticProps() and if it finds it, 
    it executes that function during this pre-rendering process before it calls the component function.

    Job of getStaticProps is to prepare props for this page. 
    And these props could then contain the data this page needs.

    getStaticProps is allowed to be asynchronous. You can return a promise there
    and then, NextJS will wait for this promise to resolve, which means it waits until your data is loaded
    and then you return the props for this component function.

    In getStaticProps, you can also execute any code that would normally only run on a server.
    You could access a file system here or securely connect to a database 
    because any code you write in here will never end up on the client side and it will never execute on the client side 
    simply because this code is executed during the "build process", 
    not on the server and especially not on the clients of your visitors.

    getStaticProps => data fetching for pre-rendering

    PROBLEM WITH getStaticProps - 
    1. Data could be outdated as it is generated at build-time.
    Solution is to use a property called 'revalidate'
*/
export async function getStaticProps(context) {
  // fetch data from an API or file system, etc.

  /* 
    Here we could call fetch api to call our API routes
    e.g. fetch('/api/meetups');

    However this code in the 'getStaticProps' runs during "build time" and not exposed to client,
    we can directly get data using some helper function here.
    This will avoid sending unnecessary request to our own endpoint

    IMPORTANT -
    When you import something in a 'page' component file and that something is 
    then only used in getServerSideProps or getStaticProps, 
    then the imported package will NOT be part of the client side bundle. 
    So your credentials will NOT be exposed client/browser.

    So you can import both server side and clients side code here, and depending on where you use it,
    it will be included in different bundles which are independent from each other.
    That's a nice, smart feature built into nextJS.
  */

  // connect to mongodb
  const client = await MongoClient.connect('mongodb://localhost:27017/meetups-db');
  const db = client.db();

  // select collection in which you want to insert document
  const meetupCollections = db.collection('meetups');
  // fetch all documents
  const meetups = await meetupCollections.find().toArray();
  console.log('Home - getStaticProps =>', meetups);
  // close connection
  client.close();

  // in the end, must return an object
  return {
    // 'props' must be part of returned object
    // as it will passed to the props property of this component function (HomePage)
    props: {
      //meetups: DUMMY_MEETUPS,
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      })),
    },
    /*
    IMPORTANT -
    When we add 'revalidate' property to the object returned by getStaticProps,
    we unlock a feature called "incremental Static Generation".
    Revalidate wants a number e.g. 10 which represents the number of seconds NextJS will wait
    until it regenerates this page for an incoming request.

    That means that page will not only just be generated during the build process
    but it will also be generated at least every mentioned number of seconds(e.g. 10) on the server,
    if there are requests for this page.
    And then these regenerated pages would replace the old pre-generated pages.

    With that, you would ensure that your data is never older than mentioned number if seconds e.g. 10 secs.
    And therefore, the number of seconds you wanna use here depends on your data update frequency.
    */
    revalidate: 10,
  };
}

/*
  But sometimes even a regular update via 'getStaticProps' is not enough.
  Sometimes you really want to regenerate this page for every incoming request.
  So you want to pre-generate the page dynamically on the fly after deployment on the server,
  not during the build process and not every couple of seconds, but for every request.
  In this case, we should go for special function called 'getServerSideProps()'

  The difference to getStaticProps is that this function will now not run during the build process,
  but instead always on the server after deployment.

  Both 'getStaticProps' and 'getServerSideProps' receive an input called 'context'.
  With 'context', you get access to request and response objects via 'context.req' & 'context.res' resp.

  Possible disadvantage with 'getServerSideProps' is that 
  it means that you need to wait for your page to be generated on every incoming request.

  RECOMMENDATION - 
  If you don't have data that changes all the time, so data that changes multiple times every second.
  And if you don't need access to the request object, let's say for authentication, then
  'getStaticProps' is actually better.

  Because with 'getStaticProps', you pre-generate an HTML file, 
  that file can then be stored and served by a CDN. And that simply is faster than regenerating
  and fetching that data for every incoming request. 
  So your page will be faster when working with getStaticProps, 
  because then it can be cached and reused, instead of regenerated all the time.
*/
/*
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  //in the end, must return an object
  return {
    // 'props' must be part of returned object
    // as it will passed to the props property of this component function (HomePage)
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}*/

export default HomePage;
