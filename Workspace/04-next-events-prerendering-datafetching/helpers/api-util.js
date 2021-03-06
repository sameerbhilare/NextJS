export async function getAllEvents() {
  const response = await fetch(
    'https://nextjs-course-18143-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'
  );
  const data = await response.json();

  const transformedData = [];
  for (const key in data) {
    transformedData.push({
      id: key,
      ...data[key], // shortcut
      //   title: data[key].title,
      //   description: data[key].description,
      //   location: data[key].location,
      //   date: data[key].date,
      //   image: data[key].image,
      //   isFeatured: data[key].isFeatured,
    });
  }

  return transformedData;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}
