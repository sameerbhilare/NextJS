import Link from 'next/link';

import classes from './button.module.css';

const Button = (props) => {
  return (
    <Link href={props.link}>
      {/* Link tag in the end renders anchor tag only.
        However if we want to apply custom styling, then we need to add that anchor tag on our own.
        Rest of the functionality will be added by the Link component automcatically */}
      <a className={classes.btn}>{props.children}</a>
    </Link>
  );
};

export default Button;
