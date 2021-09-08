// this file will be served when request reaches ourdomain.com/portfolio/:projectId
// [] in the file name tells nextjs that this will be dynamic page
// so that it should be loaded for different values in your path.
// IMP - This component will NOT be called for ourdomain.com/portfolio/list
// bcz there already exists static path 'list.js' inside 'portfolio' folder.

import { useRouter } from 'next/router';

function PortfolioProjectPage() {
  /*
    With nextjs' useRouter, we get access to methods for programatic nagivation
    and also for getting values in the URL.
  */
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  // send a request to some backend server
  // to fetch the piece of data with an id of router.query.projectid

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
}

export default PortfolioProjectPage;
