import RelativeImg from "./RelativeImg";

interface SkuProductInfoProps {
  product: any;
}

const SkuProductInfo = (props: SkuProductInfoProps): JSX.Element => {
  const { product } = props;

  return (
    <div className="container">
      <RelativeImg src={product.image}></RelativeImg>
      {product.name}
    </div>
  );
};

export default SkuProductInfo;
