import Image from 'next/image';
import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import classes from './event-logistics.module.css';

function EventLogistics(props) {
  const { date, address, image, imageAlt } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = address.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        {/* Next.js will create multiple versions of our image on the fly when requests are coming in,
        then optimize those images for the operating systems and device sizes that are making the request.
        And then those generated images will be cached for future requests from similar devices.
        
        We need to set width and height to basically inform Next.js 
        about the width and height which we need for this image so that Nextjs will generate them accordingly.
        width => 400px bcz 160 px is too blurry 10rem = 160px (10 rem defined in event-logistics.module.css )
        height => 400px bcz 160 px is too blurry 10rem = 160px (10 rem defined in event-logistics.module.css)
        
        Based on this nextjs will generate optimized images, 
        you can see those generated optimized images at .next/cache/images folder.
        
        They're not generated in advance, but only when a request reaches the page.
        But then they are stored/cached so that future requests from a similar devices
        immediately get that already generated image.
        
        Another nice feature offerred by this nextjs Image component is,
        not all images on a webpage are downloaded
        but only images which are visible on the current viewport are downloaded.
        So we don't load what we don't need. :)  */}
        <Image src={`/${image}`} alt={imageAlt} width={400} height={400} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
