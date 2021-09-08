// this file will be served when request reaches ourdomain.com/clients/{id}/{clientProjectId}
// [] in the file name tells nextjs that this will be dynamic page
// so that it should be loaded for different values in your path.

import { useRouter } from 'next/router';

function SelectedClientProjectPage() {
  /*
    With nextjs' useRouter, we get access to methods for programatic nagivation
    and also for getting values in the URL.
  */
  const router = useRouter();

  console.log(router.query); // IMP - here we get both 'id' and 'clientProjectId'

  return (
    <div>
      <h1>The Project Page for a Specific Project for a Selected Client</h1>
    </div>
  );
}

export default SelectedClientProjectPage;
