import Link from 'next/link';
import Logo from './logo';
import classes from './main-navigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      {/* if Link body is not plain text, we have to wrap the non-text element into an anchor tag */}
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/posts'>Posts</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
