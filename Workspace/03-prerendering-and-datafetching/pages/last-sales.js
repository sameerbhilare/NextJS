import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const LastSalesPage = (props) => {
  /*
    IMP =>
    props.sales are the sales which are used for the initial state here.
    They then can and will be overwritten by the result of the client side data fetching due to useSWR.
    */
  const [sales, setSales] = useState(props.sales); // initial sales state
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    'https://nextjs-course-18143-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json',
    fetcher
  );

  useEffect(() => {
    console.log({ data, error });
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       'https://nextjs-course-18143-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  /*
    By default nextjs pre-renders pages which doesn't have getStaticProps, getServerSideProps
    So in this case, nextjs will not trigger above useEffect function and so 
    it will just pre-render initial state of this page which is <p>No data yet!</p>
    So this is what we see when we => View Page Source
  */
  //   if (!sales) {
  //     return <p>No data yet!</p>;
  //   }

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

export async function getStaticProps(context) {
  const response = await fetch(
    'https://nextjs-course-18143-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
  );
  const data = await response.json();

  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}
