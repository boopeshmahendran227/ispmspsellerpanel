import RelativeImg from "./RelativeImg";
import CSSConstants from "../constants/CSSConstants";
import { Fragment } from "react";

interface MetaInfo {
  key: string;
  value: string | Number;
}

interface ProductCardProps {
  name: string;
  image: string;
  metaInfo: MetaInfo[];
}

const ProductCard = (props: ProductCardProps) => {
  const { metaInfo } = props;
  return (
    <section className="container">
      <div className="imageContainer">
        <RelativeImg src={props.image}></RelativeImg>
      </div>
      <div className="contentContainer">
        <span className="name">{props.name}</span>
        <div className="metaInfoContainer">
          {Boolean(metaInfo) &&
            metaInfo.map((obj, index) => (
              <Fragment key={index}>
                <span className="key">{obj.key}: </span>
                <span className="value">{obj.value}</span>
              </Fragment>
            ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 0.5em 0;
          display: flex;
          text-align: initial;
        }
        .imageContainer {
          width: 5rem;
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
        .metaInfoContainer {
          margin-top: 0.5em;
          color: ${CSSConstants.secondaryTextColor};
          font-size: 0.9rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-row-gap: 0.1em;
        }
        .metaInfoContainer .key {
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};

export default ProductCard;
