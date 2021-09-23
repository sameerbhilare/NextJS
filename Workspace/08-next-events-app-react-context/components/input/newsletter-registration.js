import { useContext, useRef } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailRef = useRef();

  // use context
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;

    notificationCtx.showNotification({
      title: 'Signing up',
      message: 'Registering for Newsletter',
      status: 'pending',
    });

    // send valid data to API
    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: enteredEmail }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        // error case
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Signing up',
          message: 'Successfully registered for Newsletter!',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            ref={emailRef}
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
