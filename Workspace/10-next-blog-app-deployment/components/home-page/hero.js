import Image from 'next/image';
import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/Sameer.jpg'
          alt='An image showing Sameer'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Sameer</h1>
      <p>
        I blog about web development - espcecially about frontend frameworks like Angular, React.
      </p>
    </section>
  );
}

export default Hero;
