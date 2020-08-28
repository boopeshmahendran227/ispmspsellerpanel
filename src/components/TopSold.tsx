import React from "react";
import RelativeImg from "./RelativeImg";
import CSSConstants from "../constants/CSSConstants";

interface topSoldProps {
  data: any[];
}
const TopSold = (props: topSoldProps): JSX.Element => {
  return (
    <div>
      <table>
        <tbody>
          {props.data.map((item) => {
            return (
              <tr key={item.productId}>
                <div className="content">
                  <div className="productContainer">
                    {/* <div className="imageContainer">
              <RelativeImg src={result.items[0].productSnapshot.images[0]} />
            </div> */}
                    <p>
                      <b>{item.productName}</b>
                    </p>
                  </div>
                  <p className="category">{item.categoryName}</p>
                  <p>{item.qtySold} Orders</p>
                </div>
              </tr>
            );
          })}
        </tbody>
      </table>
      <style jsx>{`
        width: 100%;
        justify-items: center;
        padding: auto;

        .content {
          margin-left: 10px;
        }
        p {
          margin: 0.5rem;
        }
        .productContainer {
          display: flex;
          align-items: center;
          justify-content: auto;
        }

        .imageContainer {
          display: inline-flex;
          width: 3rem;
          height: 3rem;
          align-items: center;
          margin-top: 0.5rem;
        }
        .category {
          color: ${CSSConstants.secondaryTextColor};
        }

        tr {
          border-top: 0.5px solid ${CSSConstants.borderColor};
        }

        tr:hover {
          background-color: ${CSSConstants.hoverColor} !important;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
export default TopSold;
