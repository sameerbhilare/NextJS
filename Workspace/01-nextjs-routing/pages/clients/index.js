import Link from 'next/link';

function ClientsPage() {
  // assume this clients list is fetched from backend (so dynamic array)
  const clients = [
    { id: 'max', name: 'Maximilian' },
    { id: 'manu', name: 'Manuel' },
  ];

  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {/* Dynamic Routes via Link -
                This special Link component renders an anchor tag but it watches clicks on those anchor tags
                and if you click there, it prevents the browser default of sending a request and getting a new HTML page.
                Instead, it will load the to be loaded component for you and change the URL
                so that it looks like you changed the page but in reality, you stay in that single page application.*/}
            <Link
              href={{
                pathname: '/clients/[id]',
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
