// 'index.js' file will be served when request reaches ourdomain.com/
// anologous to index.html
// the name 'index.js' is a special name.
import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <h1>The Home Page</h1>
      <ul>
        <li>
          <Link href='/portfolio'>Portfolio</Link>
        </li>
        <li>
          <Link href='/clients'>Clients</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
