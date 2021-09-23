import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;

    // send valid data to API
    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: enteredEmail }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
