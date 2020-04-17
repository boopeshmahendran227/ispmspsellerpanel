import { ProductAttributeValue } from "../types/product";
import RelativeImg from "./RelativeImg";

interface ProductCardProps {
  name: string;
  image: string;
  attributeValues: ProductAttributeValue[];
  qty?: number;
}

const ProductCard = (props: ProductCardProps) => {
  const attributeValues = props.attributeValues.map((attributeValue) => {
    if (attributeValue.attributeName) {
      return (
        <div>
          {attributeValue.attributeName}: {attributeValue.value}
        </div>
      );
    } else {
      return <div>{attributeValue.value}</div>;
    }
  });

  return (
    <section className="container">
      <div className="imageContainer">
        <RelativeImg src={props.image}></RelativeImg>
      </div>
      <div className="contentContainer">
        <span className="name">{props.name}</span>
        <div>{attributeValues}</div>
        {Boolean(props.qty) && <div>Quantity: {props.qty}</div>}
      </div>
      <style jsx>{`
        .container {
          margin: 0.5em 0;
          display: flex;
          text-align: initial;
          max-width: 300px;
        }
        .imageContainer {
          width: 7rem;
          text-align: center;
          padding: 0.5em;
          padding-left: 0;
        }
        .contentContainer {
          padding-top: 1em;
        }
        .name {
          font-weight: 700;
          font-size: 1rem;
        }
      `}</style>
    </section>
  );
};

export default ProductCard;
