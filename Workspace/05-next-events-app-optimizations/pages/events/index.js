import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';

const AllEventsPage = (props) => {
  const events = props.events;
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;

// static site rendering
export async function getStaticProps(context) {
  // all events
  const allEvents = await getAllEvents();

  // return all events
  return {
    props: {
      events: allEvents,
    },
    revalidate: 60, // every 60 secs we regenereate this page for new incoming request
  };
}
