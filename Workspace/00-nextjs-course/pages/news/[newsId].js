// this file will be served when request reaches ourdomain.com/news/:newsId
// [] in the file name tells nextjs that this will be dynamic page
// so that it should be loaded for different values in your path.

import { useRouter } from 'next/router';

const DetailPage = () => {
  /*
    With nestjs' useRouter, we get access to methods for programatic nagivation
    and also for getting values in the URL.
  */
  const router = useRouter(); // hook from next/router

  // accessing the parameters
  const newsId = router.query.newsId;

  return <h1>The News Detail Page - {newsId}</h1>;
};

export default DetailPage;
