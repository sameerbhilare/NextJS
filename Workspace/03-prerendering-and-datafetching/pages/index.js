import path from 'path'; // from nodejs (backend)
import fs from 'fs'; // from nodejs (backend)

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}

export default HomePage;

/*
  getStaticProps prepares the 'props' for this (HomePage) component.
  The code inside getStaticProps will never be visible on the client side.

  NextJs wil first call this getStaticProps function and then executes the component (HomePage) function. 
  Both these steps are run at build time
*/
export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  // must return object with 'props' key
  return {
    props: {
      products: data.products,
    },
  };
}
