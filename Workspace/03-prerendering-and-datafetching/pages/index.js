import path from 'path'; // from nodejs (backend)
import fs from 'fs'; // from nodejs (backend)

import Link from 'next/link';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <Link href={`/products/${p.id}`}>{p.title}</Link>
        </li>
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
  console.log('Regenerating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      // to redirect to another route
      redirect: {
        destination: '/some-route',
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true, //true => will show 404 error page instead of normal page
    };
  }

  // must return object with 'props' key
  return {
    props: {
      products: data.products,
    },
    /* time in seconds that Next.js should wait until it re-generates this page.
    e.g. for every incoming request to this page, it should be re-generated unless,
    it's less than 10 seconds ago that it was last re-generated.
    
    IMP => During development, the page will be re-generated for every request, 
    no matter what you set 'revalidate'. 
    So with the development server, we will always see the latest page with the latest data,
    and this will always run again. But in production this number will matter.
    */
    revalidate: 10,
  };
}
