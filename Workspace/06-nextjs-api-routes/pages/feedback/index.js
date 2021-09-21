import { buildFeedbackPath, extractFeedback } from '../api/feedback'; // this will not be included in client side bundle

function FeedbackPage(props) {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

export default FeedbackPage;

export async function getStaticProps() {
  /*
    You should not use fetch api inside of getStaticProps orgetServerSideProps to talk to your OWN API
    which are part of this nextjs app.
    Instead write any normal node.js code here
    */
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}
