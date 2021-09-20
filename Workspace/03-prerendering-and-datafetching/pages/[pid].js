import path from 'path'; // from nodejs (backend)
import fs from 'fs'; // from nodejs (backend)

const ProductDetailPage = (props) => {
  return (
    <>
      <h1>{props.loadedProduct.title}</h1>
      <p>{props.loadedProduct.description}</p>
    </>
  );
};

export default ProductDetailPage;

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
