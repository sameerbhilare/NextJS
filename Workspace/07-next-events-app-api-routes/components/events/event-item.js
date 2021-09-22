import Image from 'next/image';
import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

import classes from './event-item.module.css';

const EventItem = (props) => {
  const { title, image, date, location, id } = props;

  const readableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');

  return (
    <li className={classes.item}>
      {/* Next.js will create multiple versions of our image on the fly when requests are coming in,
      then optimize those images for the operating systems and device sizes that are making the request.
      And then those generated images will be cached for future requests from similar devices.
      
      We need to set width and height to basically inform Next.js 
      about the width and height which we need for this image.
      width => 40% of 640px. (40rem = 640 px, 40 rem defined in event-list.module.css )
      height => 10rem = 160px (10 rem defined in event-item.module.css)
      
      Based on this nextjs will generate optimized images, 
      you can see those generated optimized images at .next/cache/images folder.
      
      They're not generated in advance, but only when a request reaches the page.
      But then they are stored/cached so that future requests from a similar devices
      immediately get that already generated image.
      
      Another nice feature offerred by this nextjs Image component is,
      not all images on a webpage are downloaded
      but only images which are visible on the current viewport are downloaded.
      So we don't load what we don't need. :)  */}
      <Image src={'/' + image} alt={title} width={250} height={160} />

      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
