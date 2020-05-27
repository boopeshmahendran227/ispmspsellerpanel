import { TierPriceInterface } from "../types/product";
import CSSConstants from "../constants/CSSConstants";

interface TierPriceProps {
  tierPrice: TierPriceInterface[];
}

const TierPrice = (props: TierPriceProps) => {
  const { tierPrice } = props;

  if (tierPrice.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <header>Tier Price</header>
      <table>
        {tierPrice.length > 0 && (
          <thead>
            <tr>
              <th>S.no</th>
              <th>Min Qty</th>
              <th>Discount Percentage</th>
            </tr>
          </thead>
        )}
        <tbody>
          {tierPrice.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.minQty}</td>
              <td>{item.discountPercentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .container {
          margin: 3em 0;
          font-size: 1.1rem;
        }
        header {
          font-weight: bold;
          font-size: 1.3rem;
          border-bottom: 1px solid ${CSSConstants.borderColor};
          padding: 0.3em;
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
};

export default TierPrice;
