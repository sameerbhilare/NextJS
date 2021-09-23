import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { useEffect, useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

const FilteredEventsPage = (props) => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(
    'https://nextjs-course-18143-default-rtdb.asia-southeast1.firebasedatabase.app/events.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          ...data[key], // shortcut
        });
      }

      setLoadedEvents(transformedData);
    }
  }, [data]);

  let pageHeadData = (
    <>
      {/*  Next.js injects the content which we add between these 'Head' tags 
into the real 'head' part of the rendered page. */}
      <Head>
        <title>Filtered Events</title>
        <meta name='description' content='A list of filtered events!' />
      </Head>
    </>
  );

  if (!loadedEvents) {
    // this component is loaded twice, first - as a call to this route and second time because of useRouter
    // for first load, the useRouter does not have required data (router.query.slug)
    return (
      <>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // convert to number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <>
      {/*  Next.js injects the content which we add between these 'Head' tags 
into the real 'head' part of the rendered page. */}
      <Head>
        <title>Filtered Events</title>
        <meta name='description' content={`All events for ${numMonth}/${numYear}`} />
      </Head>
    </>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;

// server side rendering - for every incoming request
/*
export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // convert to number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      // custom handling
      props: {
        hasError: true,
      },

      // noFound: true, // show 404 page for invalid
      // redirect: {
      //   destination: '/error'
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });

  // return filered events
  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
*/
