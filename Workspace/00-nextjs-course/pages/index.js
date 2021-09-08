// 'index.js' file will be served when request reaches ourdomain.com/
// anologous to index.html
// the name 'index.js' is a special name.

import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <h1>The Home Page</h1>
      <ul>
        <li>
          {/* This special Link component renders an anchor tag but it watches clicks on those anchor tags
                and if you click there, it prevents the browser default of sending a request and getting a new HTML page.
                Instead, it will load the to be loaded component for you and change the URL
                so that it looks like you changed the page but in reality, you stay in that single page application.*/}
          <Link href='/news/nextjs-great-frmw'>NextJS is a great framework!</Link>
        </li>
        <li>
          <Link href='/news/nextjs-fullstack-frmw'>NextJS is a FULLSTACK framework!</Link>
        </li>
      </ul>
    </>
  );
};

export default HomePage;
