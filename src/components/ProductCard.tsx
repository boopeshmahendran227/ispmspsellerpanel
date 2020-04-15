import { ProductAttributeValue } from "../types/product";
import RelativeImg from "./RelativeImg";

interface ProductCardProps {
  name: string;
  image: string;
  attributeValues: ProductAttributeValue[];
}

const ProductCard = (props: ProductCardProps) => {
  const attributeValueStr = props.attributeValues
    .map((attributeValue) => {
      if (attributeValue.attributeName) {
        return `${attributeValue.attributeName}: ${attributeValue.value}`;
      } else {
        return `${attributeValue.value}`;
      }
    })
    .join(" ");

  return (
    <section className="container">
      <div className="imageContainer">
        <RelativeImg src={props.image}></RelativeImg>
      </div>
      <div className="contentContainer">
        <span className="name">{props.name}</span>
        <div>{attributeValueStr}</div>
      </div>
      <style jsx>{`
        .container {
          margin: 0.5em 0;
          display: flex;
          text-align: initial;
        }
        .imageContainer {
          width: 6rem;
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
