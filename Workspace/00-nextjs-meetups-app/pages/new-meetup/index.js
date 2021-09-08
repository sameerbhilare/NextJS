// This file will be served when request reaches ourdomain.com/new-meetup
// the name 'index.js' is a special name.

import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    //console.log(enteredMeetupData);

    // send request to API route which will be internal path as both frontend and backend are on same server
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
    router.push('/');
  };

  return (
    <>
      {/* 'Head' component from next/head allows you to add Head elements to the Head section of your page.
      All the HTML elements which you can add in the Head section, you can add them between <Head></Head>. */}
      <Head>
        <title>Add a New Meetup</title>
        {/* this text for 'description' will be shown by search engines */}
        <meta
          name='description'
          content='Add your own meetups and create networking opportunities!'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
