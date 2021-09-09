import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';

const FilteredEventsPage = () => {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    // this component is loaded twice, first - as a call to this route and second time because of useRouter
    // for first load, the useRouter does not have required data (router.query.slug)
    return <p className='center'>Loading...</p>;
  }

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
    return <p>Invalid Filter. Please adjust your values (Year, Month)!</p>;
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }

  return (
    <div>
      <h1>Filtered Events Page Page</h1>
    </div>
  );
};

export default FilteredEventsPage;
