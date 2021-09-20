import path from 'path'; // from nodejs (backend)
import fs from 'fs'; // from nodejs (backend)

const ProductDetailPage = (props) => {
  /*
    The dynamic pre-generation does not finish instantly. 
    So therefore instead when using fallback: true in getStaticPaths,
    we should be prepared to return a fallback state in our component.
    */
  if (!props.loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{props.loadedProduct.title}</h1>
      <p>{props.loadedProduct.description}</p>
    </>
  );
};

export default ProductDetailPage;

/*
  IMPORTANT - 
  Next.js by defult pre-renders each page.
  But if you have a dynamic segment leading to a page (e.g. this page component [pid].js),
  the default behavior is not to pre-generate the page.

  This is obvious bcz since this is dynamic path segment and value for 'pid' an be anything at runtime.
  So nextjs does not no beforehand what is the value for this dynamic page.

  Now if you use getStaticProps in this (dynamic page) component function,
  that means we want to pre-render this (dynamic) page.
  In such cases of dynamic pages, we need to give nextjs some additional information
  via getStaticPaths which tells Next.js which concrete instances of this dynamic page must be pre-generated.
*/
export async function getStaticPaths() {
  return {
    // this tells Next.js that this dynamic page ([pid].js) should be pre-generated
    // three times with these three values as a value for this dynamic segment identifier.
    paths: [
      {
        params: {
          pid: 'p1', // 'pid' is dynamic path segment ([pid].js)
        },
      },
      {
        params: {
          pid: 'p2', // 'pid' is dynamic path segment ([pid].js)
        },
      },
    ],

    // helpful when we have lot of pages to regenerate
    /*
        fallback: true tell NextJS that even pages which are not listed above, 
        (So even parameter values for the PID parameter which are not listed above) 
        can be valid values that should be loaded when they are visited.
        But they're not pre-generated, instead they're generated just in time when a request reaches the server.

        And that allows us to pre-generate highly visited pages, 
        and postpone the generation to less frequented pages to the server, 
        so that they are only pre-generated when they're needed.
    */
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // dyna params are available on 'context' object
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((p) => p.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}
