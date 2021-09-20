import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { getEventById, getAllEvents } from '../../helpers/api-util';

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event Found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;

// for which eventIds it should pre-render this page
export async function getStaticPaths() {
  const allEvents = await getAllEvents();
  const paramEvents = allEvents.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paramEvents,
    fallback: false, // bcz we did specify all possible paths so for unknown events, nextjs will show 404
  };
}

// page pre-rendering
export async function getStaticProps(context) {
  // get access to params
  const { params } = context;

  const event = await getEventById(params.eventId);

  return {
    props: {
      selectedEvent: event,
    },
  };
}
