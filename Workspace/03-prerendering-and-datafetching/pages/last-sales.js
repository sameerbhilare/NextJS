import { useEffect, useState } from 'react';

const LastSalesPage = () => {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://nextjs-course-18143-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
    )
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  /*
    By default nextjs pre-renders pages which doesn't have getStaticProps, getServerSideProps
    So in this case, nextjs will not trigger above useEffect function and so 
    it will just pre-render initial state of this page which is <p>No data yet!</p>
    So this is what we see when we => View Page Source
  */
  if (!sales) {
    return <p>No data yet!</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;
