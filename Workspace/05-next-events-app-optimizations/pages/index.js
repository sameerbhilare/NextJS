import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = (props) => {
  return (
    <div>
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
