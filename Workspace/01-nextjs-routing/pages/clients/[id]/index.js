// this file will be served when request reaches ourdomain.com/clients/{id}/
// [] in the file name tells nextjs that this will be dynamic page
// so that it should be loaded for different values in your path.
import { useRouter } from 'next/router';

function ClientProjectsPage() {
  const router = useRouter();

  console.log(router.query);

  function loadProjectHandler() {
    // load data...

    // programmatic/imperative navigation
    // way 1
    //router.push('clients/max/projecta');
    //router.replace('clients/max/projecta'); // to replace current page, so cant go back after navigation

    // way 2
    router.push({
      pathname: '/clients/[id]/[clientprojectid]', // we can use any placeholder names
      query: { id: 'max', clientprojectid: 'projecta' }, // values must match placeholder names
    });
  }

  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectsPage;
