import { OrderInterface } from "../../types/order";
import _ from "lodash";
import { formatPrice } from "utils/misc";
import CSSConstants from "../../constants/CSSConstants";

interface OrderSummaryProps {
  order: OrderInterface;
}

const OrderSummary = (props: OrderSummaryProps) => {
  const { order } = props;

  return (
    <div className="grid">
      <span className="key">Sub Total</span>
      <span className="value">
        {formatPrice(
          _.chain(order.items)
            .map((item) => item.discountedPrice)
            .sum()
            .value()
        )}
      </span>
      <span className="key">Shipping Fee</span>
      <span className="value">
        {" "}
        + {formatPrice(order.metadata.shipmentFee)}
      </span>
      {order.discountSplits.map((discount) => (
        <>
          <span className="key discount">{discount.discountType}</span>
          <span className="value discount">
            - {formatPrice(discount.discountAmount)}
          </span>
        </>
      ))}
      <span className="key total">Net Total</span>
      <span className="value total">{formatPrice(order.totalPrice)}</span>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: 100px 100px;
        }
        .key {
          margin: 0.1em 0;
          font-weight: bold;
        }
        .value {
          text-align: right;
        }
        .total {
          margin: 0.6em 0;
          font-size: 1.1rem;
        }
        .discount {
          color: ${CSSConstants.successColor};
        }
      `}</style>
    </div>
  );
};

export default OrderSummary;
