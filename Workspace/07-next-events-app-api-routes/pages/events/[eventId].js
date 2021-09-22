import Head from 'next/head';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Comments from '../../components/input/comments';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/*  Next.js injects the content which we add between these 'Head' tags 
      into the real 'head' part of the rendered page. */}
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
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
      <Comments eventId={event.id} />
    </>
  );
};

export default EventDetailPage;

// for which eventIds it should pre-render this page
export async function getStaticPaths() {
  // pre-rendering only featured events to avoid pages generation for all events (could be 100s)
  const allEvents = await getFeaturedEvents();
  const paramEvents = allEvents.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paramEvents,
    // this tells nextjs that there might be more pages than we pre generated here
    // Then it will try to dynamically generate the page
    // if it encounters a page which was not pre-generated before.
    fallback: true, // or 'blocking'
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
    revalidate: 30, // every 30 seconds we regenereate this page for new incoming request
  };
}
