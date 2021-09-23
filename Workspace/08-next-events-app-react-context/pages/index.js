import Head from 'next/head';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = (props) => {
  return (
    <div>
      {/*  Next.js injects the content which we add between these 'Head' tags 
      into the real 'head' part of the rendered page. */}
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events that allow you to evolve...' />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
};

export default HomePage;

// static site rendering
export async function getStaticProps(context) {
  // filter
  const featuredEvents = await getFeaturedEvents();

  // return featured events
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, // every 30 mins we regenereate this page for new incoming request
  };
}
